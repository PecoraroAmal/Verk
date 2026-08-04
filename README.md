# Verk™

**Verk™** (Swedish for "works") is a Progressive Web App (PWA) for tracking all your media and reading in one place. It runs as a self-hosted Node.js/Express app, with your library data stored server-side.

## Features

📱 **Track Multiple Media Types:**
- Films
- TV Series
- Anime
- Cartoons
- Books
- Manga

✨ **Rich Features:**
- Rate your items (0-10)
- Track status (watched/read, to watch/read, in progress)
- Record first viewing/reading dates
- Count rewatches/re-readings
- Add comments and notes
- Customise card colours
- Filter and search functionality

🎨 **Modern Design:**
- Light and dark themes
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive user interface in UK English

💾 **Data Management:**
- Data stored server-side in a JSON file, served through a small Express API
- Export data as JSON
- Import data from JSON files
- Default example items (can be deleted)

📲 **Progressive Web App:**
- Install on any device
- Works offline (once loaded, via the service worker)
- Fast and reliable
- Native app experience

## Running Verk

Verk needs its Node.js server running to load and save data — it's not a static, GitHub-Pages-only app.

### Requirements

- Node.js and npm

### Install & Run

```
npm install
npm start
```

By default the server listens on port 3000 (override with the `PORT` environment variable). Then open `http://localhost:3000` (or your server's address) in a browser.

### Deployment notes

- Supports systemd socket activation (`LISTEN_FDS`) for on-demand hosting setups (e.g. Oracle Cloud).
- The server automatically shuts itself down after 5 minutes of inactivity, so it's meant to be relaunched on demand (e.g. via a socket-activated systemd service) rather than run as a permanently idling process.

## Usage

### Adding Items

1. Click the **"Add Item"** button
2. Select a category
3. Fill in the details (name is required)
4. Choose a colour for the card
5. Click **"Add Item"**

### Viewing Items

- Click on any card to view full details
- Filter by category or status
- Search by name
- View rating, dates, and comments

### Editing/Deleting Items

1. Click on an item card
2. Click **"Edit"** to modify details
3. Click **"Delete"** to remove the item

### Data Management

1. Go to **Settings** (gear icon)
2. **Export Data:** Download your data as JSON
3. **Import Data:** Upload a JSON file to restore or transfer data

### Themes

Choose between Light, Dark, or Auto (follows system preference) in Settings. The theme choice is stored locally in your browser (`localStorage`); all other data lives on the server.

## File Structure

```
Verk/
├── index.html          # Main HTML file
├── styles.css          # Styling and themes
├── app.js              # Application logic (client)
├── server.js           # Express server: static hosting + /api/data
├── manifest.json       # PWA manifest
├── sw.js               # Service worker for offline support
├── data/                # verk-data.json lives here (created at runtime, git-ignored)
├── icons/               # App icons (72-512px)
├── package.json
└── README.md            # This file
```

## Browser Support

Works on all modern browsers that support:
- Service Workers
- ES6+ JavaScript
- Fetch API

Recommended: Chrome, Firefox, Safari, Edge (latest versions)

## Privacy

Your library data is stored server-side, in the `data/verk-data.json` file on whichever machine runs the Verk server — it is not sent to any third party. Only your theme preference is kept in the browser's `localStorage`. Use the Export/Import features in Settings to back up or move your data.

## Contributing

This is a personal project, but suggestions and improvements are welcome via GitHub issues and pull requests.

## Licence

Verk™ is distributed under a custom licence — see [LICENCE](LICENCE) for the full text. In short: the source code must remain open and unobfuscated in any distribution, modified copies must carry attribution to the original author, and the "Verk" name/branding may not be reused for derivative works. Commercial use of modified versions is permitted under those conditions.

## Author

Amal Pecoraro

## Links

- GitHub: https://github.com/PecoraroAmal/Verk
- Issues: https://github.com/PecoraroAmal/Verk/issues
