# Verk

A Progressive Web App (PWA) for organising all your works in one place - films, TV series, anime, cartoons, books, and manga.

## Features

- ✅ **Offline-first**: Works entirely in your browser, even without an internet connection
- ✅ **Multiple categories**: Films, TV Series, Anime, Cartoons, Books, and Manga
- ✅ **Local storage**: All data is stored securely in your browser
- ✅ **Import/Export**: Easily backup or restore your collection with JSON
- ✅ **Default examples**: Comes with sample entries to get you started
- ✅ **Responsive design**: Works on desktop, tablet, and mobile devices
- ✅ **UK English**: Uses British English spelling and conventions

## Getting Started

### Installation

1. Open `index.html` in a modern web browser
2. For the best experience, install as a PWA:
   - On desktop: Click the install icon in your browser's address bar
   - On mobile: Use "Add to Home Screen" from your browser menu

### Usage

#### Adding a Work

1. Click the "+ Add Work" button
2. Select a category from the dropdown
3. Fill in the title (required) and other optional details
4. Click "Save"

#### Managing Works

- **Filter by category**: Use the filter buttons to view specific types of works
- **Edit**: Click the "Edit" button on any work card
- **Delete**: Click the "Delete" button on any work card (confirms before deletion)

#### Import/Export

- **Export**: Click "Export JSON" to download your collection as a JSON file
- **Import**: Click "Import JSON" and paste JSON data to add works to your collection

### JSON Format

Works are stored in the following format:

```json
[
  {
    "id": "unique-id",
    "category": "films",
    "title": "Example Film",
    "creator": "Director Name",
    "year": 2024,
    "status": "completed",
    "rating": 8,
    "notes": "Optional notes about the work"
  }
]
```

#### Categories

- `films` - Films
- `tv-series` - TV Series
- `anime` - Anime
- `cartoons` - Cartoons
- `books` - Books
- `manga` - Manga

#### Status Options

- `plan-to-watch` - Plan to Watch/Read
- `in-progress` - In Progress
- `completed` - Completed
- `on-hold` - On Hold
- `dropped` - Dropped

## Technical Details

- Pure HTML, CSS, and JavaScript - no build process required
- Uses localStorage for data persistence
- Service Worker for offline functionality
- Responsive design with CSS Grid and Flexbox
- PWA manifest for installability

## Browser Support

Works in all modern browsers that support:
- localStorage
- Service Workers
- ES6+ JavaScript

## Privacy

All data is stored locally in your browser. No data is sent to external servers. You have full control over your data through the import/export functionality.

## License

Open source - feel free to use and modify as needed.