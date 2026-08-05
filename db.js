const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'verk.db');

const CATEGORIES = ['films', 'tv-series', 'anime', 'cartoons', 'books', 'manga'];
const STATUSES = ['watched', 'to-watch', 'in-progress', 'read', 'to-read'];

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS items (
  id         TEXT PRIMARY KEY,
  category   TEXT NOT NULL CHECK (category IN ('films','tv-series','anime','cartoons','books','manga')),
  name       TEXT NOT NULL CHECK (length(trim(name)) > 0),
  rating     REAL CHECK (rating IS NULL OR (rating >= 0 AND rating <= 10)),
  status     TEXT NOT NULL CHECK (status IN ('watched','to-watch','in-progress','read','to-read')),
  firstDate  TEXT,
  repeats    INTEGER NOT NULL DEFAULT 0 CHECK (repeats >= 0),
  comment    TEXT,
  note       TEXT,
  colour     TEXT NOT NULL DEFAULT '#4a90e2',
  favorite   INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0,1)),
  createdAt  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updatedAt  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_favorite ON items(favorite);
`;

let db;

function openDatabase() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const instance = new Database(DB_PATH);
  instance.pragma('journal_mode = WAL');
  instance.exec(SCHEMA_SQL);
  return instance;
}

function reopen() {
  db = openDatabase();
}

reopen();

function rowToItem(row) {
  return row ? { ...row, favorite: !!row.favorite } : null;
}

function getAllItems() {
  return db.prepare('SELECT * FROM items ORDER BY rowid DESC').all().map(rowToItem);
}

function getItemById(id) {
  return rowToItem(db.prepare('SELECT * FROM items WHERE id = ?').get(id));
}

function itemCount() {
  return db.prepare('SELECT COUNT(*) AS c FROM items').get().c;
}

function isEmpty() {
  return itemCount() === 0;
}

const INSERT_SQL = `
  INSERT INTO items (id, category, name, rating, status, firstDate, repeats, comment, note, colour, favorite)
  VALUES (@id, @category, @name, @rating, @status, @firstDate, @repeats, @comment, @note, @colour, @favorite)
`;

function createItem(data, { preserveId = false } = {}) {
  const id = (preserveId && data.id) ? data.id : crypto.randomUUID();
  db.prepare(INSERT_SQL).run({
    id,
    category: data.category,
    name: data.name,
    rating: data.rating ?? null,
    status: data.status,
    firstDate: data.firstDate ?? null,
    repeats: data.repeats ?? 0,
    comment: data.comment ?? null,
    note: data.note ?? null,
    colour: data.colour || '#4a90e2',
    favorite: data.favorite ? 1 : 0
  });
  return getItemById(id);
}

function createItemsBulk(items, { preserveId = false } = {}) {
  const insertMany = db.transaction((arr) => arr.map((it) => createItem(it, { preserveId })));
  return insertMany(items);
}

function updateItem(id, data) {
  const existing = getItemById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data, id };
  db.prepare(`
    UPDATE items SET
      category = @category,
      name = @name,
      rating = @rating,
      status = @status,
      firstDate = @firstDate,
      repeats = @repeats,
      comment = @comment,
      note = @note,
      colour = @colour,
      favorite = @favorite,
      updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now')
    WHERE id = @id
  `).run({
    id,
    category: merged.category,
    name: merged.name,
    rating: merged.rating ?? null,
    status: merged.status,
    firstDate: merged.firstDate ?? null,
    repeats: merged.repeats ?? 0,
    comment: merged.comment ?? null,
    note: merged.note ?? null,
    colour: merged.colour || '#4a90e2',
    favorite: merged.favorite ? 1 : 0
  });
  return getItemById(id);
}

function deleteItem(id) {
  const result = db.prepare('DELETE FROM items WHERE id = ?').run(id);
  return result.changes > 0;
}

function deleteAllItems() {
  db.prepare('DELETE FROM items').run();
}

function replaceAllItems(items, { preserveId = true } = {}) {
  const tx = db.transaction((arr) => {
    db.prepare('DELETE FROM items').run();
    arr.forEach((it) => createItem(it, { preserveId }));
  });
  tx(items);
  return getAllItems();
}

async function backupToFile(destPath) {
  return db.backup(destPath);
}

function checkpointAndClose() {
  try {
    db.pragma('wal_checkpoint(TRUNCATE)');
  } finally {
    db.close();
  }
}

function isValidLegacyItemShape(item) {
  return item
    && typeof item === 'object'
    && CATEGORIES.includes(item.category)
    && typeof item.name === 'string' && item.name.trim().length > 0
    && STATUSES.includes(item.status);
}

function findLegacyJsonSource() {
  const liveFile = path.join(DATA_DIR, 'verk-data.json');
  if (fs.existsSync(liveFile)) return liveFile;

  const root = __dirname;
  const backups = fs.readdirSync(root)
    .filter((f) => /^verk-backup-.*\.json$/.test(f))
    .map((f) => ({ f, mtime: fs.statSync(path.join(root, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return backups.length ? path.join(root, backups[0].f) : null;
}

function seedFromLegacyJsonIfEmpty() {
  if (!isEmpty()) return { seeded: false };

  const candidate = findLegacyJsonSource();
  if (!candidate) return { seeded: false };

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(candidate, 'utf8'));
  } catch (err) {
    console.error(`[db] Impossibile leggere ${candidate}:`, err.message);
    return { seeded: false };
  }
  if (!Array.isArray(parsed) || parsed.length === 0) return { seeded: false };

  const valid = parsed.filter(isValidLegacyItemShape);
  const skipped = parsed.length - valid.length;
  if (skipped > 0) {
    console.warn(`[db] ${skipped} elementi scartati durante il seed (formato non valido)`);
  }
  if (valid.length === 0) return { seeded: false };

  replaceAllItems(valid, { preserveId: true });
  console.log(`[db] Seed automatico: importati ${valid.length} elementi da ${candidate}`);
  return { seeded: true, count: valid.length, source: candidate };
}

module.exports = {
  DB_PATH,
  CATEGORIES,
  STATUSES,
  getAllItems,
  getItemById,
  itemCount,
  isEmpty,
  createItem,
  createItemsBulk,
  updateItem,
  deleteItem,
  deleteAllItems,
  replaceAllItems,
  backupToFile,
  checkpointAndClose,
  reopen,
  seedFromLegacyJsonIfEmpty
};
