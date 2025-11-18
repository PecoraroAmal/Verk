# Verk

**Verk** (Swedish for 'works') is a Progressive Web App for managing all your works in one place - films, TV series, anime, cartoons, books, and manga.

## Features

- 📱 **Progressive Web App** - Install on any device and use offline
- 🎬 **Multiple Categories** - Films, TV Series, Anime, Cartoons, Books, and Manga
- ⭐ **Rating System** - Rate your works from 0 to 10
- 📊 **Status Tracking** - Track what you've watched/read, want to watch/read, or are in progress
- 📅 **Date Tracking** - Record first viewing/reading dates
- 🔄 **Rewatch/Re-reading Counter** - Keep track of how many times you've revisited a work
- 💬 **Comments & Notes** - Add your thoughts and where to find each work
- 🎨 **Custom Colours** - Personalise each card with custom colours
- 💾 **Import/Export** - Backup your data as JSON
- 🔒 **Privacy First** - All data stored locally in your browser, no servers involved

## Getting Started

### Installation

1. Open the app in a modern web browser
2. Click the install prompt or use your browser's "Install App" option
3. The app will work offline once installed!

### Usage

#### Adding a Work

1. Click the **"Add Work"** button
2. Select the category (Films, TV Series, Anime, Cartoons, Books, or Manga)
3. Fill in the details:
   - **Name** (required)
   - **Rating** (0-10)
   - **Status** (required) - differs based on category:
     - For visual media: watched, to watch, in progress
     - For reading material: read, to read, in progress
   - **First Viewing/Reading** - date when you first experienced the work
   - **Rewatches/Re-readings** - number of times revisited
   - **Comment** - your thoughts and notes
   - **Note** - e.g., "Netflix", "Physical copy"
   - **Colour** - custom colour for the card
4. Click **"Save"**

#### Managing Works

- **View Details**: Click on any card to see full details
- **Edit**: Click "Edit" button on a card or in the detail view
- **Delete**: Click "Delete" button (you'll be asked to confirm)
- **Filter**: Use the category filter to view specific types of works

#### Import/Export Data

- **Export**: Click "Export" to download your data as JSON
- **Import**: Click "Import" and select a JSON file to restore data
  - ⚠️ Importing will replace all current data

## Technical Details

- Built with vanilla JavaScript, HTML5, and CSS3
- Uses localStorage for data persistence
- Service Worker for offline functionality
- Fully responsive design
- UK English localisation
- No build process required - just open index.html!

## Default Examples

The app comes with 3 example works that you can delete:
- Inception (Film)
- Pride and Prejudice (Book)
- Attack on Titan (Anime)

## Browser Compatibility

Works on all modern browsers that support:
- Service Workers
- localStorage
- ES6+ JavaScript

Recommended browsers: Chrome, Firefox, Safari, Edge (latest versions)

## Licence

This project is open source and available under the MIT Licence.