// Popular Anime Series
const popularAnime = [
    {
        name: "Fullmetal Alchemist: Brotherhood",
        category: "anime",
        rating: 9.1,
        status: "watched",
        note: "Shōnen masterpiece",
        colour: "#C41E3A"
    },
    {
        name: "Death Note",
        category: "anime",
        rating: 8.9,
        status: "watched",
        note: "Psychological thriller",
        colour: "#1C1C1C"
    },
    {
        name: "Attack on Titan",
        category: "anime",
        rating: 8.9,
        status: "watched",
        note: "Dark fantasy action",
        colour: "#8B4513"
    },
    {
        name: "Steins;Gate",
        category: "anime",
        rating: 8.8,
        status: "watched",
        note: "Time travel thriller",
        colour: "#4A90E2"
    },
    {
        name: "Hunter x Hunter (2011)",
        category: "anime",
        rating: 9.0,
        status: "watched",
        note: "Adventure shōnen",
        colour: "#228B22"
    },
    {
        name: "One Piece",
        category: "anime",
        rating: 8.8,
        status: "watched",
        note: "Epic pirate adventure",
        colour: "#FF6347"
    },
    {
        name: "Naruto",
        category: "anime",
        rating: 8.4,
        status: "watched",
        note: "Ninja adventure",
        colour: "#FF8C00"
    },
    {
        name: "Naruto: Shippuden",
        category: "anime",
        rating: 8.7,
        status: "watched",
        note: "Ninja adventure sequel",
        colour: "#FF8C00"
    },
    {
        name: "My Hero Academia",
        category: "anime",
        rating: 8.3,
        status: "watched",
        note: "Superhero shōnen",
        colour: "#32CD32"
    },
    {
        name: "Demon Slayer: Kimetsu no Yaiba",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Supernatural action",
        colour: "#4B0082"
    },
    {
        name: "Cowboy Bebop",
        category: "anime",
        rating: 8.9,
        status: "watched",
        note: "Space western classic",
        colour: "#FFD700"
    },
    {
        name: "Code Geass",
        category: "anime",
        rating: 8.7,
        status: "watched",
        note: "Mecha strategic thriller",
        colour: "#8B008B"
    },
    {
        name: "Sword Art Online",
        category: "anime",
        rating: 7.6,
        status: "watched",
        note: "Virtual reality adventure",
        colour: "#1E90FF"
    },
    {
        name: "Tokyo Ghoul",
        category: "anime",
        rating: 7.8,
        status: "watched",
        note: "Dark fantasy horror",
        colour: "#DC143C"
    },
    {
        name: "One Punch Man",
        category: "anime",
        rating: 8.7,
        status: "watched",
        note: "Superhero comedy",
        colour: "#FFD700"
    },
    {
        name: "Mob Psycho 100",
        category: "anime",
        rating: 8.5,
        status: "watched",
        note: "Supernatural comedy",
        colour: "#FF1493"
    },
    {
        name: "Neon Genesis Evangelion",
        category: "anime",
        rating: 8.5,
        status: "watched",
        note: "Psychological mecha",
        colour: "#8B008B"
    },
    {
        name: "Jujutsu Kaisen",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Supernatural shōnen",
        colour: "#4B0082"
    },
    {
        name: "Chainsaw Man",
        category: "anime",
        rating: 8.4,
        status: "watched",
        note: "Dark fantasy action",
        colour: "#FF4500"
    },
    {
        name: "Spy x Family",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Comedy action",
        colour: "#FF69B4"
    },
    // Hayao Miyazaki saga
    {
        name: "Spirited Away",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#98D8C8"
    },
    {
        name: "My Neighbour Totoro",
        category: "anime",
        rating: 8.1,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#7CB342"
    },
    {
        name: "Princess Mononoke",
        category: "anime",
        rating: 8.3,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#8B4513"
    },
    {
        name: "Dragon Ball Z",
        category: "anime",
        rating: 8.7,
        status: "watched",
        note: "Classic battle shōnen",
        colour: "#FF8C00"
    },
    {
        name: "Your Lie in April",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Musical drama romance",
        colour: "#FFB6C1"
    },
    {
        name: "Violet Evergarden",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Emotional drama",
        colour: "#9370DB"
    },
    {
        name: "Made in Abyss",
        category: "anime",
        rating: 8.7,
        status: "watched",
        note: "Dark fantasy adventure",
        colour: "#4682B4"
    },
    {
        name: "Vinland Saga",
        category: "anime",
        rating: 8.7,
        status: "watched",
        note: "Historical action drama",
        colour: "#8B4513"
    },
    // Hayao Miyazaki Films
    {
        name: "Nausicaä of the Valley of the Wind",
        category: "anime",
        rating: 8.0,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#87CEEB"
    },
    {
        name: "Castle in the Sky",
        category: "anime",
        rating: 8.0,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#4682B4"
    },
    {
        name: "My Neighbour Totoro",
        category: "anime",
        rating: 8.1,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#7CB342"
    },
    {
        name: "Kiki's Delivery Service",
        category: "anime",
        rating: 7.8,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#9370DB"
    },
    {
        name: "Porco Rosso",
        category: "anime",
        rating: 7.7,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#CD5C5C"
    },
    {
        name: "Princess Mononoke",
        category: "anime",
        rating: 8.3,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#228B22"
    },
    {
        name: "Spirited Away",
        category: "anime",
        rating: 8.6,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#98D8C8"
    },
    {
        name: "Howl's Moving Castle",
        category: "anime",
        rating: 8.2,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#5DADE2"
    },
    {
        name: "Ponyo",
        category: "anime",
        rating: 7.6,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#FF6B6B"
    },
    {
        name: "The Wind Rises",
        category: "anime",
        rating: 7.7,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#87CEEB"
    },
    {
        name: "The Boy and the Heron",
        category: "anime",
        rating: 7.5,
        status: "watched",
        note: "Hayao Miyazaki saga",
        colour: "#4682B4"
    }
];
