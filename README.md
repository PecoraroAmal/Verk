# Verk™ — Live: https://pecoraroamal.github.io/Verk/

**Verk™** (Swedish for "works") is a Progressive Web App (PWA) for tracking all your media and reading in one place.

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
- All data stored locally in your browser
- Export data as JSON
- Import data from JSON files
- Default example items (can be deleted)

📲 **Progressive Web App:**
- Install on any device
- Works offline
- Fast and reliable
- Native app experience

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

Choose between Light, Dark, or Auto (follows system preference) in Settings

## File Structure

```
Verk/
├── index.html          # Main HTML file
├── styles.css          # Styling and themes
├── app.js              # Application logic
├── manifest.json       # PWA manifest
├── service-worker.js   # Service worker for offline support
├── icons/              # App icons (72-512px)
└── README.md           # This file
```

## Browser Support

Works on all modern browsers that support:
- localStorage
- Service Workers
- ES6+ JavaScript

Recommended: Chrome, Firefox, Safari, Edge (latest versions)

## Privacy

Verk™ stores all data locally in your browser using localStorage. No data is sent to any server. Your information stays on your device unless you choose to export it.

## Contributing

This is a personal project, but suggestions and improvements are welcome via GitHub issues and pull requests.

## Licence

MIT Licence - Feel free to use and modify as needed.

## Author

Amal Pecoraro

## Links

- GitHub: https://github.com/PecoraroAmal/Verk
- Issues: https://github.com/PecoraroAmal/Verk/issues