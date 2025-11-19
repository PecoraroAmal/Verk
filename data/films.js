// Popular Films and Sagas
const popularFilms = [
    // The Lord of the Rings Trilogy
    {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        category: "films",
        rating: 8.9,
        status: "watched",
        note: "Epic fantasy saga - Part 1",
        colour: "#8B4513"
    },
    {
        name: "The Lord of the Rings: The Two Towers",
        category: "films",
        rating: 8.8,
        status: "watched",
        note: "Epic fantasy saga - Part 2",
        colour: "#8B4513"
    },
    {
        name: "The Lord of the Rings: The Return of the King",
        category: "films",
        rating: 9.0,
        status: "watched",
        note: "Epic fantasy saga - Part 3",
        colour: "#8B4513"
    },
    // Harry Potter Series
    {
        name: "Harry Potter and the Philosopher's Stone",
        category: "films",
        rating: 7.6,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Chamber of Secrets",
        category: "films",
        rating: 7.4,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Prisoner of Azkaban",
        category: "films",
        rating: 7.9,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Goblet of Fire",
        category: "films",
        rating: 7.7,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Order of the Phoenix",
        category: "films",
        rating: 7.5,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Half-Blood Prince",
        category: "films",
        rating: 7.6,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Deathly Hallows: Part 1",
        category: "films",
        rating: 7.7,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    {
        name: "Harry Potter and the Deathly Hallows: Part 2",
        category: "films",
        rating: 8.1,
        status: "watched",
        note: "Harry Potter",
        colour: "#722F37"
    },
    // Star Wars Original Trilogy
    {
        name: "Star Wars: Episode IV - A New Hope",
        category: "films",
        rating: 8.6,
        status: "watched",
        note: "Original trilogy",
        colour: "#FFE81F"
    },
    {
        name: "Star Wars: Episode V - The Empire Strikes Back",
        category: "films",
        rating: 8.7,
        status: "watched",
        note: "Original trilogy",
        colour: "#FFE81F"
    },
    {
        name: "Star Wars: Episode VI - Return of the Jedi",
        category: "films",
        rating: 8.3,
        status: "watched",
        note: "Original trilogy",
        colour: "#FFE81F"
    },
    // Marvel Cinematic Universe - Phase 1
    {
        name: "Iron Man",
        category: "films",
        rating: 7.9,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 1",
        colour: "#C8102E"
    },
    {
        name: "The Incredible Hulk",
        category: "films",
        rating: 6.7,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 1",
        colour: "#7CB342"
    },
    {
        name: "Iron Man 2",
        category: "films",
        rating: 7.0,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 1",
        colour: "#C8102E"
    },
    {
        name: "Thor",
        category: "films",
        rating: 7.0,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 1",
        colour: "#0D47A1"
    },
    {
        name: "Captain America: The First Avenger",
        category: "films",
        rating: 6.9,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 1",
        colour: "#1565C0"
    },
    {
        name: "The Avengers",
        category: "films",
        rating: 8.0,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 1",
        colour: "#C8102E"
    },
    // Marvel Cinematic Universe - Phase 2
    {
        name: "Iron Man 3",
        category: "films",
        rating: 7.1,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 2",
        colour: "#C8102E"
    },
    {
        name: "Thor: The Dark World",
        category: "films",
        rating: 6.8,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 2",
        colour: "#0D47A1"
    },
    {
        name: "Captain America: The Winter Soldier",
        category: "films",
        rating: 7.7,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 2",
        colour: "#1565C0"
    },
    {
        name: "Guardians of the Galaxy",
        category: "films",
        rating: 8.0,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 2",
        colour: "#AB47BC"
    },
    {
        name: "Avengers: Age of Ultron",
        category: "films",
        rating: 7.3,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 2",
        colour: "#E53935"
    },
    {
        name: "Ant-Man",
        category: "films",
        rating: 7.3,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 2",
        colour: "#D32F2F"
    },
    // Marvel Cinematic Universe - Phase 3
    {
        name: "Captain America: Civil War",
        category: "films",
        rating: 7.8,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#1565C0"
    },
    {
        name: "Doctor Strange",
        category: "films",
        rating: 7.5,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#00897B"
    },
    {
        name: "Guardians of the Galaxy Vol. 2",
        category: "films",
        rating: 7.6,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#AB47BC"
    },
    {
        name: "Spider-Man: Homecoming",
        category: "films",
        rating: 7.4,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#E53935"
    },
    {
        name: "Thor: Ragnarok",
        category: "films",
        rating: 7.9,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#0D47A1"
    },
    {
        name: "Black Panther",
        category: "films",
        rating: 7.3,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#6A1B9A"
    },
    {
        name: "Avengers: Infinity War",
        category: "films",
        rating: 8.4,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#C8102E"
    },
    {
        name: "Ant-Man and the Wasp",
        category: "films",
        rating: 7.0,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#D32F2F"
    },
    {
        name: "Captain Marvel",
        category: "films",
        rating: 6.8,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#D4AF37"
    },
    {
        name: "Avengers: Endgame",
        category: "films",
        rating: 8.4,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#C8102E"
    },
    {
        name: "Spider-Man: Far From Home",
        category: "films",
        rating: 7.4,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 3",
        colour: "#E53935"
    },
    // Marvel Cinematic Universe - Phase 4
    {
        name: "Black Widow",
        category: "films",
        rating: 6.7,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#7B1FA2"
    },
    {
        name: "Shang-Chi and the Legend of the Ten Rings",
        category: "films",
        rating: 7.4,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#C62828"
    },
    {
        name: "Eternals",
        category: "films",
        rating: 6.3,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#D4AF37"
    },
    {
        name: "Spider-Man: No Way Home",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#E53935"
    },
    {
        name: "Doctor Strange in the Multiverse of Madness",
        category: "films",
        rating: 6.9,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#00897B"
    },
    {
        name: "Thor: Love and Thunder",
        category: "films",
        rating: 6.2,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#0D47A1"
    },
    {
        name: "Black Panther: Wakanda Forever",
        category: "films",
        rating: 6.7,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 4",
        colour: "#6A1B9A"
    },
    // Marvel Cinematic Universe - Phase 5
    {
        name: "Ant-Man and the Wasp: Quantumania",
        category: "films",
        rating: 6.0,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 5",
        colour: "#D32F2F"
    },
    {
        name: "Guardians of the Galaxy Vol. 3",
        category: "films",
        rating: 7.9,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 5",
        colour: "#AB47BC"
    },
    {
        name: "The Marvels",
        category: "films",
        rating: 5.5,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 5",
        colour: "#D4AF37"
    },
    {
        name: "Deadpool & Wolverine",
        category: "films",
        rating: 7.7,
        status: "watched",
        note: "Marvel Cinematic Universe saga - Phase 5",
        colour: "#E53935"
    },
    {
        name: "Captain America: Brave New World",
        category: "films",
        rating: null,
        status: "to-watch",
        note: "Marvel Cinematic Universe saga - Phase 5",
        colour: "#1565C0"
    },
    {
        name: "Thunderbolts*",
        category: "films",
        rating: null,
        status: "to-watch",
        note: "Marvel Cinematic Universe saga - Phase 5",
        colour: "#616161"
    },
    // Marvel Cinematic Universe - Phase 6
    {
        name: "The Fantastic Four",
        category: "films",
        rating: null,
        status: "to-watch",
        note: "Marvel Cinematic Universe saga - Phase 6",
        colour: "#1976D2"
    },
    {
        name: "Avengers: Doomsday",
        category: "films",
        rating: null,
        status: "to-watch",
        note: "Marvel Cinematic Universe saga - Phase 6",
        colour: "#C8102E"
    },
    {
        name: "Spider-Man: Brand New Day",
        category: "films",
        rating: null,
        status: "to-watch",
        note: "Marvel Cinematic Universe saga - Phase 6",
        colour: "#E53935"
    },
    {
        name: "Avengers: Secret Wars",
        category: "films",
        rating: null,
        status: "to-watch",
        note: "Marvel Cinematic Universe saga - Phase 6",
        colour: "#C8102E"
    },
    // Classic Films
    {
        name: "The Shawshank Redemption",
        category: "films",
        rating: 9.3,
        status: "watched",
        note: "Classic drama",
        colour: "#2F4F4F"
    },
    {
        name: "The Godfather",
        category: "films",
        rating: 9.2,
        status: "watched",
        note: "Classic crime drama",
        colour: "#1C1C1C"
    },
    {
        name: "Pulp Fiction",
        category: "films",
        rating: 8.9,
        status: "watched",
        note: "Tarantino classic",
        colour: "#D4AF37"
    },
    {
        name: "Forrest Gump",
        category: "films",
        rating: 8.8,
        status: "watched",
        note: "Inspirational drama",
        colour: "#4169E1"
    },
    {
        name: "Inception",
        category: "films",
        rating: 8.8,
        status: "watched",
        note: "Sci-fi thriller",
        colour: "#36454F"
    },
    {
        name: "The Matrix",
        category: "films",
        rating: 8.7,
        status: "watched",
        note: "Sci-fi action",
        colour: "#00FF41"
    },
    {
        name: "Interstellar",
        category: "films",
        rating: 8.7,
        status: "watched",
        note: "Space epic",
        colour: "#191970"
    },
    // Pixar Classics
    {
        name: "Toy Story",
        category: "films",
        rating: 8.3,
        status: "watched",
        note: "Pixar classic",
        colour: "#FF6347"
    },
    {
        name: "Finding Nemo",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Pixar animation",
        colour: "#1E90FF"
    },
    {
        name: "The Incredibles",
        category: "films",
        rating: 8.0,
        status: "watched",
        note: "Superhero family",
        colour: "#FF4500"
    },
    {
        name: "WALL-E",
        category: "films",
        rating: 8.4,
        status: "watched",
        note: "Sci-fi animation",
        colour: "#FFD700"
    },
    {
        name: "Inside Out",
        category: "films",
        rating: 8.1,
        status: "watched",
        note: "Emotional journey",
        colour: "#FFD700"
    },
    // Christopher Nolan Films
    {
        name: "Memento",
        category: "films",
        rating: 8.4,
        status: "watched",
        note: "Christopher Nolan",
        colour: "#2C3E50"
    },
    {
        name: "Batman Begins",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Christopher Nolan - Dark Knight trilogy",
        colour: "#1A1A1A"
    },
    {
        name: "The Prestige",
        category: "films",
        rating: 8.5,
        status: "watched",
        note: "Christopher Nolan",
        colour: "#4A235A"
    },
    {
        name: "The Dark Knight",
        category: "films",
        rating: 9.0,
        status: "watched",
        note: "Christopher Nolan - Dark Knight trilogy",
        colour: "#1A1A1A"
    },
    {
        name: "The Dark Knight Rises",
        category: "films",
        rating: 8.4,
        status: "watched",
        note: "Christopher Nolan - Dark Knight trilogy",
        colour: "#1A1A1A"
    },
    {
        name: "Interstellar",
        category: "films",
        rating: 8.7,
        status: "watched",
        note: "Christopher Nolan",
        colour: "#191970"
    },
    {
        name: "Dunkirk",
        category: "films",
        rating: 7.8,
        status: "watched",
        note: "Christopher Nolan",
        colour: "#5D6D7E"
    },
    {
        name: "Tenet",
        category: "films",
        rating: 7.3,
        status: "watched",
        note: "Christopher Nolan",
        colour: "#34495E"
    },
    {
        name: "Oppenheimer",
        category: "films",
        rating: 8.3,
        status: "watched",
        note: "Christopher Nolan",
        colour: "#E67E22"
    },
    // David Fincher Films
    {
        name: "Se7en",
        category: "films",
        rating: 8.6,
        status: "watched",
        note: "David Fincher",
        colour: "#212F3C"
    },
    {
        name: "Fight Club",
        category: "films",
        rating: 8.8,
        status: "watched",
        note: "David Fincher",
        colour: "#943126"
    },
    {
        name: "Zodiac",
        category: "films",
        rating: 7.7,
        status: "watched",
        note: "David Fincher",
        colour: "#566573"
    },
    {
        name: "The Curious Case of Benjamin Button",
        category: "films",
        rating: 7.8,
        status: "watched",
        note: "David Fincher",
        colour: "#85929E"
    },
    {
        name: "The Social Network",
        category: "films",
        rating: 7.8,
        status: "watched",
        note: "David Fincher",
        colour: "#3B5998"
    },
    {
        name: "Gone Girl",
        category: "films",
        rating: 8.1,
        status: "watched",
        note: "David Fincher",
        colour: "#7D3C98"
    },
    // Martin Scorsese Films
    {
        name: "Taxi Driver",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#922B21"
    },
    {
        name: "Raging Bull",
        category: "films",
        rating: 8.1,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#1C2833"
    },
    {
        name: "Goodfellas",
        category: "films",
        rating: 8.7,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#641E16"
    },
    {
        name: "Casino",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#D4AF37"
    },
    {
        name: "Gangs of New York",
        category: "films",
        rating: 7.5,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#7B7D7D"
    },
    {
        name: "The Aviator",
        category: "films",
        rating: 7.5,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#5DADE2"
    },
    {
        name: "The Departed",
        category: "films",
        rating: 8.5,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#1F618D"
    },
    {
        name: "Shutter Island",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#17202A"
    },
    {
        name: "The Wolf of Wall Street",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#138D75"
    },
    {
        name: "The Irishman",
        category: "films",
        rating: 7.8,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#7B241C"
    },
    {
        name: "Killers of the Flower Moon",
        category: "films",
        rating: 7.6,
        status: "watched",
        note: "Martin Scorsese",
        colour: "#784212"
    },
    // Quentin Tarantino Films
    {
        name: "Reservoir Dogs",
        category: "films",
        rating: 8.3,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#1C2833"
    },
    {
        name: "Jackie Brown",
        category: "films",
        rating: 7.5,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#D68910"
    },
    {
        name: "Kill Bill: Vol. 1",
        category: "films",
        rating: 8.2,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#F39C12"
    },
    {
        name: "Kill Bill: Vol. 2",
        category: "films",
        rating: 8.0,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#F39C12"
    },
    {
        name: "Inglourious Basterds",
        category: "films",
        rating: 8.4,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#7B7D7D"
    },
    {
        name: "Django Unchained",
        category: "films",
        rating: 8.5,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#943126"
    },
    {
        name: "The Hateful Eight",
        category: "films",
        rating: 7.8,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#641E16"
    },
    {
        name: "Once Upon a Time in Hollywood",
        category: "films",
        rating: 7.6,
        status: "watched",
        note: "Quentin Tarantino",
        colour: "#F4D03F"
    },
    // DC Extended Universe
    {
        name: "Man of Steel",
        category: "films",
        rating: 7.1,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#0D47A1"
    },
    {
        name: "Batman v Superman: Dawn of Justice",
        category: "films",
        rating: 6.5,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#212121"
    },
    {
        name: "Suicide Squad",
        category: "films",
        rating: 5.9,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#E91E63"
    },
    {
        name: "Wonder Woman",
        category: "films",
        rating: 7.3,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#C62828"
    },
    {
        name: "Justice League",
        category: "films",
        rating: 6.1,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#1565C0"
    },
    {
        name: "Aquaman",
        category: "films",
        rating: 6.8,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#00897B"
    },
    {
        name: "Shazam!",
        category: "films",
        rating: 7.0,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#D32F2F"
    },
    {
        name: "Birds of Prey",
        category: "films",
        rating: 6.1,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#E91E63"
    },
    {
        name: "Wonder Woman 1984",
        category: "films",
        rating: 5.4,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#C62828"
    },
    {
        name: "The Suicide Squad",
        category: "films",
        rating: 7.2,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#E91E63"
    },
    {
        name: "Zack Snyder's Justice League",
        category: "films",
        rating: 7.9,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#1565C0"
    },
    {
        name: "Black Adam",
        category: "films",
        rating: 6.2,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#F57C00"
    },
    {
        name: "Shazam! Fury of the Gods",
        category: "films",
        rating: 5.9,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#D32F2F"
    },
    {
        name: "The Flash",
        category: "films",
        rating: 6.7,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#E53935"
    },
    {
        name: "Blue Beetle",
        category: "films",
        rating: 5.9,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#1976D2"
    },
    {
        name: "Aquaman and the Lost Kingdom",
        category: "films",
        rating: 5.6,
        status: "watched",
        note: "DC Extended Universe saga",
        colour: "#00897B"
    },
    // Fast & Furious Saga
    {
        name: "The Fast and the Furious",
        category: "films",
        rating: 6.8,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#212121"
    },
    {
        name: "2 Fast 2 Furious",
        category: "films",
        rating: 5.9,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#1976D2"
    },
    {
        name: "The Fast and the Furious: Tokyo Drift",
        category: "films",
        rating: 6.0,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#E53935"
    },
    {
        name: "Fast & Furious",
        category: "films",
        rating: 6.5,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#424242"
    },
    {
        name: "Fast Five",
        category: "films",
        rating: 7.3,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#D4AF37"
    },
    {
        name: "Fast & Furious 6",
        category: "films",
        rating: 7.0,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#616161"
    },
    {
        name: "Furious 7",
        category: "films",
        rating: 7.1,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#757575"
    },
    {
        name: "The Fate of the Furious",
        category: "films",
        rating: 6.6,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#E53935"
    },
    {
        name: "F9: The Fast Saga",
        category: "films",
        rating: 5.2,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#1976D2"
    },
    {
        name: "Fast X",
        category: "films",
        rating: 5.7,
        status: "watched",
        note: "Fast & Furious saga",
        colour: "#F57C00"
    },
    // Transformers Saga
    {
        name: "Transformers",
        category: "films",
        rating: 7.0,
        status: "watched",
        note: "Transformers saga",
        colour: "#1565C0"
    },
    {
        name: "Transformers: Revenge of the Fallen",
        category: "films",
        rating: 6.0,
        status: "watched",
        note: "Transformers saga",
        colour: "#616161"
    },
    {
        name: "Transformers: Dark of the Moon",
        category: "films",
        rating: 6.2,
        status: "watched",
        note: "Transformers saga",
        colour: "#424242"
    },
    {
        name: "Transformers: Age of Extinction",
        category: "films",
        rating: 5.6,
        status: "watched",
        note: "Transformers saga",
        colour: "#E53935"
    },
    {
        name: "Transformers: The Last Knight",
        category: "films",
        rating: 5.2,
        status: "watched",
        note: "Transformers saga",
        colour: "#7B1FA2"
    },
    {
        name: "Bumblebee",
        category: "films",
        rating: 6.7,
        status: "watched",
        note: "Transformers saga",
        colour: "#F9A825"
    },
    {
        name: "Transformers: Rise of the Beasts",
        category: "films",
        rating: 6.0,
        status: "watched",
        note: "Transformers saga",
        colour: "#D84315"
    }
];
