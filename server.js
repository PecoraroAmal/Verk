const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'verk-data.json');

app.use(express.json());

// Don't expose the raw data file through static serving
app.get('/data/verk-data.json', (req, res) => {
  res.sendStatus(404);
});

app.get('/api/data', async (req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    res.type('application/json').send(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.json([]);
    } else {
      console.error('Error reading data file:', err);
      res.status(500).json({ error: 'Unable to read data file' });
    }
  }
});

app.post('/api/data', async (req, res) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.sendStatus(204);
  } catch (err) {
    console.error('Error writing data file:', err);
    res.status(500).json({ error: 'Unable to write data file' });
  }
});

app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Verk server listening on http://0.0.0.0:${PORT}`);
});
