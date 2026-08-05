const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const Database = require('better-sqlite3');
const itemsDb = require('./db.js');

const app = express();
const PORT = process.env.PORT || 3000;

const MEDIA_CATEGORIES = ['films', 'tv-series', 'anime', 'cartoons'];
const READING_CATEGORIES = ['books', 'manga'];
const MEDIA_STATUSES = ['watched', 'to-watch', 'in-progress'];
const READING_STATUSES = ['read', 'to-read', 'in-progress'];

app.use(express.json({ limit: '10mb' }));

// Don't expose the raw database files through static serving
// (data/ also holds the popular-items catalogs, e.g. films.js, which must stay servable)
const BLOCKED_DATA_FILES = new Set([
  'verk-data.json',
  'verk.db',
  'verk.db-wal',
  'verk.db-shm',
  'verk.db-journal'
]);
app.get('/data/:file', (req, res, next) => {
  if (BLOCKED_DATA_FILES.has(req.params.file)) return res.sendStatus(404);
  next();
});

function validateItemPayload(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  if (!body || typeof body !== 'object') {
    return { errors: ['Payload mancante o non valido'], data: null };
  }

  const has = (key) => Object.prototype.hasOwnProperty.call(body, key);

  if (!partial || has('category')) {
    if (!itemsDb.CATEGORIES.includes(body.category)) {
      errors.push(`category deve essere una tra: ${itemsDb.CATEGORIES.join(', ')}`);
    } else {
      data.category = body.category;
    }
  }

  if (!partial || has('name')) {
    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
      errors.push('name deve essere una stringa non vuota');
    } else {
      data.name = body.name.trim();
    }
  }

  if (!partial || has('status')) {
    const category = data.category || body.category;
    const isMedia = MEDIA_CATEGORIES.includes(category);
    const isReading = READING_CATEGORIES.includes(category);
    const allowedStatuses = isReading ? READING_STATUSES : (isMedia ? MEDIA_STATUSES : itemsDb.STATUSES);
    if (!allowedStatuses.includes(body.status)) {
      errors.push(`status deve essere uno tra: ${allowedStatuses.join(', ')}`);
    } else {
      data.status = body.status;
    }
  }

  if (has('rating')) {
    if (body.rating !== null && body.rating !== undefined) {
      const rating = Number(body.rating);
      if (Number.isNaN(rating) || rating < 0 || rating > 10) {
        errors.push('rating deve essere un numero tra 0 e 10, oppure null');
      } else {
        data.rating = rating;
      }
    } else {
      data.rating = null;
    }
  }

  if (has('firstDate')) {
    data.firstDate = body.firstDate || null;
  }

  if (has('repeats')) {
    const repeats = Number(body.repeats);
    if (!Number.isInteger(repeats) || repeats < 0) {
      errors.push('repeats deve essere un intero >= 0');
    } else {
      data.repeats = repeats;
    }
  }

  if (has('comment')) data.comment = body.comment || null;
  if (has('note')) data.note = body.note || null;
  if (has('colour')) data.colour = typeof body.colour === 'string' && body.colour ? body.colour : '#4a90e2';
  if (has('favorite')) data.favorite = !!body.favorite;

  return { errors, data };
}

itemsDb.seedFromLegacyJsonIfEmpty();

app.get('/api/items', (req, res) => {
  try {
    res.json(itemsDb.getAllItems());
  } catch (err) {
    console.error('Error reading items:', err);
    res.status(500).json({ error: 'Unable to read items' });
  }
});

app.post('/api/items', (req, res) => {
  try {
    const { errors, data } = validateItemPayload(req.body, { partial: false });
    if (errors.length) return res.status(400).json({ error: 'Invalid payload', details: errors });
    res.status(201).json(itemsDb.createItem(data));
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Unable to create item' });
  }
});

app.post('/api/items/bulk', (req, res) => {
  try {
    if (!Array.isArray(req.body?.items)) {
      return res.status(400).json({ error: 'items[] richiesto' });
    }
    const validated = [];
    for (let i = 0; i < req.body.items.length; i++) {
      const { errors, data } = validateItemPayload(req.body.items[i], { partial: false });
      if (errors.length) {
        return res.status(400).json({ error: `Invalid payload at items[${i}]`, details: errors });
      }
      validated.push(data);
    }
    res.status(201).json(itemsDb.createItemsBulk(validated));
  } catch (err) {
    console.error('Error bulk creating items:', err);
    res.status(500).json({ error: 'Unable to create items' });
  }
});

app.put('/api/items/:id', (req, res) => {
  try {
    const { errors, data } = validateItemPayload(req.body, { partial: false });
    if (errors.length) return res.status(400).json({ error: 'Invalid payload', details: errors });
    const updated = itemsDb.updateItem(req.params.id, data);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Unable to update item' });
  }
});

app.patch('/api/items/:id', (req, res) => {
  try {
    const { errors, data } = validateItemPayload(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ error: 'Invalid payload', details: errors });
    const updated = itemsDb.updateItem(req.params.id, data);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  } catch (err) {
    console.error('Error patching item:', err);
    res.status(500).json({ error: 'Unable to update item' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  try {
    res.sendStatus(itemsDb.deleteItem(req.params.id) ? 204 : 404);
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Unable to delete item' });
  }
});

app.delete('/api/items', (req, res) => {
  try {
    itemsDb.deleteAllItems();
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting all items:', err);
    res.status(500).json({ error: 'Unable to delete items' });
  }
});

app.get('/api/export', (req, res) => {
  try {
    const filename = `verk-backup-${new Date().toISOString().split('T')[0]}.json`;
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    res.type('application/json').send(JSON.stringify(itemsDb.getAllItems(), null, 2));
  } catch (err) {
    console.error('Error exporting data:', err);
    res.status(500).json({ error: 'Unable to export data' });
  }
});

app.post('/api/import', (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Atteso un array di item' });
    }
    const errors = [];
    req.body.forEach((it, i) => {
      const { errors: e } = validateItemPayload(it, { partial: false });
      if (e.length) errors.push(`item[${i}]: ${e.join(', ')}`);
    });
    if (errors.length) return res.status(400).json({ error: 'Invalid payload', details: errors });

    const result = itemsDb.replaceAllItems(req.body, { preserveId: true });
    res.json({ imported: result.length });
  } catch (err) {
    console.error('Error importing data:', err);
    res.status(500).json({ error: 'Unable to import data' });
  }
});

app.get('/api/export/db', async (req, res) => {
  const tmp = path.join(os.tmpdir(), `verk-export-${Date.now()}.db`);
  try {
    await itemsDb.backupToFile(tmp);
    const filename = `verk-${new Date().toISOString().split('T')[0]}.db`;
    res.download(tmp, filename, (err) => {
      fs.unlink(tmp, () => {});
      if (err) console.error('Error sending db export:', err);
    });
  } catch (err) {
    fs.unlink(tmp, () => {});
    console.error('Error exporting db:', err);
    res.status(500).json({ error: 'Backup non riuscito' });
  }
});

let dbSwapInProgress = false;

app.post('/api/import/db', express.raw({ limit: '50mb', type: 'application/octet-stream' }), async (req, res) => {
  if (dbSwapInProgress) return res.status(409).json({ error: 'Import già in corso, riprovare' });
  dbSwapInProgress = true;

  const tmpUpload = path.join(os.tmpdir(), `verk-upload-${Date.now()}.db`);
  let uploadWritten = false;

  try {
    if (!req.body || !req.body.length) {
      return res.status(400).json({ error: 'File .db mancante o vuoto' });
    }
    fs.writeFileSync(tmpUpload, req.body);
    uploadWritten = true;

    const check = new Database(tmpUpload, { readonly: true, fileMustExist: true });
    let integrity, hasItemsTable, cols;
    try {
      integrity = check.pragma('integrity_check', { simple: true });
      hasItemsTable = check.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='items'"
      ).get();
      cols = hasItemsTable ? check.prepare('PRAGMA table_info(items)').all().map((c) => c.name) : [];
    } finally {
      check.close();
    }

    const requiredCols = ['id', 'category', 'name', 'status', 'colour', 'favorite'];
    const schemaOk = requiredCols.every((c) => cols.includes(c));

    if (integrity !== 'ok' || !hasItemsTable || !schemaOk) {
      return res.status(400).json({ error: 'File .db non valido o schema incompatibile' });
    }

    itemsDb.checkpointAndClose();
    const backupName = `${itemsDb.DB_PATH}.bak-${Date.now()}`;
    fs.renameSync(itemsDb.DB_PATH, backupName);
    ['-wal', '-shm'].forEach((suf) => {
      try { fs.unlinkSync(itemsDb.DB_PATH + suf); } catch { /* not present */ }
    });

    fs.renameSync(tmpUpload, itemsDb.DB_PATH);
    uploadWritten = false;
    itemsDb.reopen();

    res.json({ imported: itemsDb.itemCount() });
  } catch (err) {
    console.error('Import .db fallito:', err);
    try { itemsDb.reopen(); } catch (reopenErr) { console.error('Reopen fallito:', reopenErr); }
    res.status(500).json({ error: 'Import fallito, database precedente conservato come backup .bak' });
  } finally {
    dbSwapInProgress = false;
    if (uploadWritten) {
      try { fs.unlinkSync(tmpUpload); } catch { /* already gone */ }
    }
  }
});

app.use(express.static(__dirname));

// --- Auto-spegnimento per inattività ---
const IDLE_TIMEOUT_MS = 5 * 60 * 1000; // 10 minuti
let idleTimer;

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    console.log('Inattivo da 5 minuti, chiusura...');
    try { itemsDb.checkpointAndClose(); } catch (err) { console.error('Checkpoint fallito:', err); }
    process.exit(0);
  }, IDLE_TIMEOUT_MS);
}

app.use((req, res, next) => {
  resetIdleTimer();
  next();
});

// --- Avvio: socket activation (systemd) o porta diretta (test manuale) ---
if (process.env.LISTEN_FDS) {
  app.listen({ fd: 3 }, () => {
    console.log('Verk avviato via socket activation (systemd)');
  });
} else {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verk server listening on http://0.0.0.0:${PORT}`);
  });
}

resetIdleTimer();
