// Sample data with popular films, TV series, anime, manga, and books
const sampleData = [
    // Disney Cartoons
    { id: '1', category: 'cartoons', name: 'The Lion King', rating: 8.5, status: 'watched', firstDate: '2024-01-15', repeats: 0, comment: 'Disney Renaissance classic', note: null, colour: '#f39c12' },
    { id: '2', category: 'cartoons', name: 'Frozen', rating: 7.4, status: 'watched', firstDate: '2024-01-20', repeats: 0, comment: 'Let it go!', note: null, colour: '#3498db' },
    { id: '3', category: 'cartoons', name: 'Moana', rating: 7.6, status: 'watched', firstDate: '2024-02-01', repeats: 0, comment: 'Beautiful Polynesian story', note: null, colour: '#1abc9c' },
    { id: '4', category: 'cartoons', name: 'Encanto', rating: 7.2, status: 'watched', firstDate: '2024-02-10', repeats: 0, comment: 'We don\'t talk about Bruno', note: null, colour: '#9b59b6' },
    { id: '5', category: 'cartoons', name: 'Big Hero 6', rating: 7.8, status: 'watched', firstDate: '2024-02-15', repeats: 0, comment: 'Baymax is adorable', note: null, colour: '#e74c3c' },
    { id: '6', category: 'cartoons', name: 'Zootopia', rating: 8.0, status: 'watched', firstDate: '2024-02-20', repeats: 0, comment: 'Smart and funny', note: null, colour: '#2ecc71' },
    { id: '7', category: 'cartoons', name: 'Tangled', rating: 7.7, status: 'watched', firstDate: '2024-03-01', repeats: 0, comment: 'Great retelling of Rapunzel', note: null, colour: '#f1c40f' },
    { id: '8', category: 'cartoons', name: 'The Princess and the Frog', rating: 7.1, status: 'watched', firstDate: '2024-03-05', repeats: 0, comment: 'New Orleans jazz vibes', note: null, colour: '#16a085' },
    { id: '9', category: 'cartoons', name: 'Mulan', rating: 7.6, status: 'watched', firstDate: '2024-03-10', repeats: 0, comment: 'Warrior princess', note: null, colour: '#c0392b' },
    { id: '10', category: 'cartoons', name: 'Aladdin', rating: 8.0, status: 'watched', firstDate: '2024-03-15', repeats: 0, comment: 'Whole new world', note: null, colour: '#8e44ad' },

    // DreamWorks Cartoons
    { id: '11', category: 'cartoons', name: 'How to Train Your Dragon', rating: 8.1, status: 'watched', firstDate: '2024-04-01', repeats: 0, comment: 'Beautiful story about friendship', note: null, colour: '#34495e' },
    { id: '12', category: 'cartoons', name: 'Kung Fu Panda', rating: 7.6, status: 'watched', firstDate: '2024-04-05', repeats: 0, comment: 'Skadoosh!', note: null, colour: '#f39c12' },
    { id: '13', category: 'cartoons', name: 'Shrek', rating: 7.9, status: 'watched', firstDate: '2024-04-10', repeats: 0, comment: 'Classic fairy tale parody', note: null, colour: '#27ae60' },
    { id: '14', category: 'cartoons', name: 'Madagascar', rating: 6.9, status: 'watched', firstDate: '2024-04-15', repeats: 0, comment: 'I like to move it move it', note: null, colour: '#e67e22' },
    { id: '15', category: 'cartoons', name: 'The Croods', rating: 7.2, status: 'watched', firstDate: '2024-04-20', repeats: 0, comment: 'Prehistoric family adventure', note: null, colour: '#d35400' },
    { id: '16', category: 'cartoons', name: 'Megamind', rating: 7.3, status: 'watched', firstDate: '2024-04-25', repeats: 0, comment: 'Clever superhero twist', note: null, colour: '#3498db' },
    { id: '17', category: 'cartoons', name: 'Rise of the Guardians', rating: 7.3, status: 'watched', firstDate: '2024-05-01', repeats: 0, comment: 'Childhood legends unite', note: null, colour: '#9b59b6' },
    { id: '18', category: 'cartoons', name: 'Trolls', rating: 6.4, status: 'watched', firstDate: '2024-05-05', repeats: 0, comment: 'Colorful and musical', note: null, colour: '#e91e63' },

    // MCU Films
    { id: '19', category: 'films', name: 'Iron Man', rating: 7.9, status: 'watched', firstDate: '2024-05-10', repeats: 0, comment: 'MCU Phase 1', note: 'The one that started it all', colour: '#c0392b' },
    { id: '20', category: 'films', name: 'The Avengers', rating: 8.0, status: 'watched', firstDate: '2024-05-15', repeats: 0, comment: 'MCU Phase 1', note: 'Assemble!', colour: '#3498db' },
    { id: '21', category: 'films', name: 'Guardians of the Galaxy', rating: 8.0, status: 'watched', firstDate: '2024-05-20', repeats: 0, comment: 'MCU Phase 2', note: 'Awesome mix', colour: '#16a085' },
    { id: '22', category: 'films', name: 'Captain America: The Winter Soldier', rating: 7.7, status: 'watched', firstDate: '2024-05-25', repeats: 0, comment: 'MCU Phase 2', note: 'Political thriller', colour: '#34495e' },
    { id: '23', category: 'films', name: 'Black Panther', rating: 7.3, status: 'watched', firstDate: '2024-06-01', repeats: 0, comment: 'MCU Phase 3', note: 'Wakanda forever', colour: '#8e44ad' },
    { id: '24', category: 'films', name: 'Avengers: Infinity War', rating: 8.4, status: 'watched', firstDate: '2024-06-05', repeats: 0, comment: 'MCU Phase 3', note: 'The snap', colour: '#9b59b6' },
    { id: '25', category: 'films', name: 'Avengers: Endgame', rating: 8.4, status: 'watched', firstDate: '2024-06-10', repeats: 0, comment: 'MCU Phase 3', note: 'Epic finale', colour: '#c0392b' },
    { id: '26', category: 'films', name: 'Spider-Man: No Way Home', rating: 8.2, status: 'watched', firstDate: '2024-06-15', repeats: 0, comment: 'MCU Phase 4', note: 'Multiverse madness', colour: '#e74c3c' },

    // Famous Anime
    { id: '27', category: 'anime', name: 'Fullmetal Alchemist: Brotherhood', rating: 9.1, status: 'watched', firstDate: '2024-07-01', repeats: 0, comment: 'Perfect anime', note: null, colour: '#f39c12' },
    { id: '28', category: 'anime', name: 'Steins;Gate', rating: 9.0, status: 'watched', firstDate: '2024-07-10', repeats: 0, comment: 'Mind-bending time travel', note: null, colour: '#3498db' },
    { id: '29', category: 'anime', name: 'Hunter x Hunter', rating: 9.0, status: 'watched', firstDate: '2024-07-20', repeats: 0, comment: 'Outstanding shonen', note: null, colour: '#2ecc71' },
    { id: '30', category: 'anime', name: 'Attack on Titan', rating: 9.0, status: 'watched', firstDate: '2024-08-01', repeats: 0, comment: 'Intense and gripping', note: null, colour: '#c0392b' },
    { id: '31', category: 'anime', name: 'Death Note', rating: 8.9, status: 'watched', firstDate: '2024-08-10', repeats: 0, comment: 'Psychological thriller', note: null, colour: '#34495e' },
    { id: '32', category: 'anime', name: 'Code Geass', rating: 8.7, status: 'watched', firstDate: '2024-08-20', repeats: 0, comment: 'Strategic brilliance', note: null, colour: '#8e44ad' },
    { id: '33', category: 'anime', name: 'Cowboy Bebop', rating: 8.9, status: 'watched', firstDate: '2024-09-01', repeats: 0, comment: 'Space western masterpiece', note: null, colour: '#e67e22' },
    { id: '34', category: 'anime', name: 'One Punch Man', rating: 8.7, status: 'watched', firstDate: '2024-09-10', repeats: 0, comment: 'Hilarious superhero parody', note: null, colour: '#f1c40f' },
    { id: '35', category: 'anime', name: 'Mob Psycho 100', rating: 8.5, status: 'watched', firstDate: '2024-09-20', repeats: 0, comment: 'Amazing animation', note: null, colour: '#9b59b6' },
    { id: '36', category: 'anime', name: 'Detective Conan', rating: 8.4, status: 'in-progress', firstDate: '2024-10-01', repeats: 0, comment: 'Long-running mystery series', note: null, colour: '#3498db' },

    // TV Series
    { id: '37', category: 'tv-series', name: 'Breaking Bad', rating: 9.5, status: 'watched', firstDate: '2024-10-10', repeats: 0, comment: 'Best drama ever', note: null, colour: '#27ae60' },
    { id: '38', category: 'tv-series', name: 'Game of Thrones', rating: 9.2, status: 'watched', firstDate: '2024-10-15', repeats: 0, comment: 'Epic fantasy', note: null, colour: '#c0392b' },
    { id: '39', category: 'tv-series', name: 'Stranger Things', rating: 8.7, status: 'watched', firstDate: '2024-10-20', repeats: 0, comment: '80s nostalgia', note: null, colour: '#e74c3c' },
    { id: '40', category: 'tv-series', name: 'The Office', rating: 9.0, status: 'watched', firstDate: '2024-10-25', repeats: 0, comment: 'Hilarious mockumentary', note: null, colour: '#95a5a6' },
    { id: '41', category: 'tv-series', name: 'Friends', rating: 8.9, status: 'watched', firstDate: '2024-11-01', repeats: 0, comment: 'Classic sitcom', note: null, colour: '#9b59b6' },
    { id: '42', category: 'tv-series', name: 'The Crown', rating: 8.6, status: 'watched', firstDate: '2024-11-05', repeats: 0, comment: 'Royal drama', note: null, colour: '#f39c12' },

    // Manga
    { id: '43', category: 'manga', name: 'One Piece', rating: 9.0, status: 'in-progress', firstDate: '2024-11-10', repeats: 0, comment: 'Epic pirate adventure', note: null, colour: '#e74c3c' },
    { id: '44', category: 'manga', name: 'Berserk', rating: 9.0, status: 'read', firstDate: '2024-11-11', repeats: 0, comment: 'Dark fantasy masterpiece', note: null, colour: '#34495e' },
    { id: '45', category: 'manga', name: 'Vagabond', rating: 8.9, status: 'read', firstDate: '2024-11-12', repeats: 0, comment: 'Beautiful art', note: null, colour: '#8e44ad' },
    { id: '46', category: 'manga', name: 'Monster', rating: 8.9, status: 'read', firstDate: '2024-11-13', repeats: 0, comment: 'Psychological thriller', note: null, colour: '#c0392b' },
    { id: '47', category: 'manga', name: 'Death Note', rating: 8.7, status: 'read', firstDate: '2024-11-14', repeats: 0, comment: 'Mind games', note: null, colour: '#2c3e50' },

    // Books
    { id: '48', category: 'books', name: '1984', rating: 8.7, status: 'read', firstDate: '2024-11-15', repeats: 0, comment: 'Dystopian classic', note: null, colour: '#7f8c8d' },
    { id: '49', category: 'books', name: 'To Kill a Mockingbird', rating: 8.6, status: 'read', firstDate: '2024-11-16', repeats: 0, comment: 'American literature', note: null, colour: '#95a5a6' },
    { id: '50', category: 'books', name: 'The Great Gatsby', rating: 8.0, status: 'read', firstDate: '2024-11-17', repeats: 0, comment: 'Jazz Age tragedy', note: null, colour: '#f39c12' },
    { id: '51', category: 'books', name: 'Pride and Prejudice', rating: 8.3, status: 'read', firstDate: '2024-11-18', repeats: 0, comment: 'Romantic classic', note: null, colour: '#e91e63' }
];
