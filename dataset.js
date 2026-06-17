// Movie Recommendation System Dataset

const MOVIES = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genres: ["Sci-Fi", "Action", "Thriller"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    duration: "2h 28m",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    icon: "🌀"
  },
  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    duration: "2h 49m",
    gradient: "linear-gradient(135deg, #1b1b2f 0%, #162447 50%, #1f4068 100%)",
    icon: "🚀"
  },
  {
    id: 3,
    title: "The Matrix",
    year: 1999,
    genres: ["Sci-Fi", "Action"],
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    duration: "2h 16m",
    gradient: "linear-gradient(135deg, #0d1f10 0%, #153e1b 50%, #1e5c2b 100%)",
    icon: "🕶️"
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    year: 2017,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    description: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    duration: "2h 44m",
    gradient: "linear-gradient(135deg, #4b1248 0%, #f0c27b 100%)",
    icon: "🌆"
  },
  {
    id: 5,
    title: "The Notebook",
    year: 2004,
    genres: ["Romance", "Drama"],
    description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    director: "Nick Cassavetes",
    cast: ["Ryan Gosling", "Rachel McAdams", "Gena Rowlands"],
    duration: "2h 3m",
    gradient: "linear-gradient(135deg, #ef3b36 0%, #ffffff 100%)",
    icon: "📖"
  },
  {
    id: 6,
    title: "La La Land",
    year: 2016,
    genres: ["Romance", "Drama", "Comedy"],
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"],
    duration: "2h 8m",
    gradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    icon: "💃"
  },
  {
    id: 7,
    title: "About Time",
    year: 2013,
    genres: ["Romance", "Comedy", "Drama"],
    description: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out to have unexpected consequences.",
    director: "Richard Curtis",
    cast: ["Domhnall Gleeson", "Rachel McAdams", "Bill Nighy"],
    duration: "2h 3m",
    gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
    icon: "⏳"
  },
  {
    id: 8,
    title: "The Dark Knight",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    duration: "2h 32m",
    gradient: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    icon: "🦇"
  },
  {
    id: 9,
    title: "Mad Max: Fury Road",
    year: 2015,
    genres: ["Action", "Sci-Fi", "Adventure"],
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    duration: "2h 0m",
    gradient: "linear-gradient(135deg, #e65c00 0%, #f9d423 100%)",
    icon: "🔥"
  },
  {
    id: 10,
    title: "Shutter Island",
    year: 2010,
    genres: ["Mystery", "Thriller"],
    description: "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth.",
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley"],
    duration: "2h 18m",
    gradient: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    icon: "🏝️"
  },
  {
    id: 11,
    title: "The Shawshank Redemption",
    year: 1994,
    genres: ["Drama"],
    description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    duration: "2h 22m",
    gradient: "linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)",
    icon: "⛪"
  },
  {
    id: 12,
    title: "Forrest Gump",
    year: 1994,
    genres: ["Drama", "Romance", "Comedy"],
    description: "The history of the United States from the 1950s to the 1970s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    duration: "2h 22m",
    gradient: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
    icon: "🍫"
  },
  {
    id: 13,
    title: "Superbad",
    year: 2007,
    genres: ["Comedy"],
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-fueled party goes awry.",
    director: "Greg Mottola",
    cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"],
    duration: "1h 53m",
    gradient: "linear-gradient(135deg, #ffc500 0%, #c21500 100%)",
    icon: "🍻"
  },
  {
    id: 14,
    title: "The Hangover",
    year: 2009,
    genres: ["Comedy"],
    description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
    director: "Todd Phillips",
    cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
    duration: "1h 40m",
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    icon: "🐅"
  },
  {
    id: 15,
    title: "Parasite",
    year: 2019,
    genres: ["Thriller", "Drama", "Comedy"],
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    duration: "2h 12m",
    gradient: "linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)",
    icon: "🍑"
  },
  {
    id: 16,
    title: "The Godfather",
    year: 1972,
    genres: ["Crime", "Drama"],
    description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    duration: "2h 55m",
    gradient: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
    icon: "🌹"
  },
  {
    id: 17,
    title: "Pulp Fiction",
    year: 1994,
    genres: ["Crime", "Drama"],
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    duration: "2h 34m",
    gradient: "linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)",
    icon: "🍔"
  },
  {
    id: 18,
    title: "Knives Out",
    year: 2019,
    genres: ["Comedy", "Mystery", "Crime"],
    description: "A detective investigates the death of the patriarch of an eccentric, combative family.",
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Chris Evans", "Ana de Armas"],
    duration: "2h 10m",
    gradient: "linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)",
    icon: "🔍"
  },
  {
    id: 19,
    title: "Spirited Away",
    year: 2001,
    genres: ["Animation", "Adventure", "Fantasy"],
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    duration: "2h 5m",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    icon: "🐉"
  },
  {
    id: 20,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genres: ["Animation", "Action", "Sci-Fi", "Adventure"],
    description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
    duration: "1h 57m",
    gradient: "linear-gradient(135deg, #fc00ff 0%, #00dbde 100%)",
    icon: "🕸️"
  },
  {
    id: 21,
    title: "Get Out",
    year: 2017,
    genres: ["Thriller", "Mystery", "Horror"],
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception eventually reaches a boiling point.",
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    duration: "1h 44m",
    gradient: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
    icon: "☕"
  },
  {
    id: 22,
    title: "The Grand Budapest Hotel",
    year: 2014,
    genres: ["Comedy", "Drama", "Adventure"],
    description: "A writer relates his adventures at a renowned resort hotel between the first and second World Wars with a concierge who is wrongly accused of murder.",
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    duration: "1h 39m",
    gradient: "linear-gradient(135deg, #ea8d8d 0%, #a890fe 100%)",
    icon: "🏨"
  },
  {
    id: 23,
    title: "Whiplash",
    year: 2014,
    genres: ["Drama", "Music"],
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser"],
    duration: "1h 46m",
    gradient: "linear-gradient(135deg, #111111 0%, #444444 100%)",
    icon: "🥁"
  },
  {
    id: 24,
    title: "Before Sunrise",
    year: 1995,
    genres: ["Romance", "Drama"],
    description: "A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna. However, both know that this will probably be their only night together.",
    director: "Richard Linklater",
    cast: ["Ethan Hawke", "Julie Delpy", "Andrea Eckert"],
    duration: "1h 41m",
    gradient: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
    icon: "🌅"
  }
];

// Seed Ratings for Collaborative Filtering
const SEED_USERS = [
  {
    id: "user_sci_fi_lover",
    name: "Alex (Sci-Fi & Action Fan)",
    ratings: {
      1: 5, 2: 5, 3: 5, 4: 5, 8: 4, 9: 4, 20: 5, 5: 1, 6: 1, 24: 1
    }
  },
  {
    id: "user_romance_lover",
    name: "Emma (Romance & Comedy Fan)",
    ratings: {
      5: 5, 6: 5, 7: 4, 12: 5, 24: 5, 1: 1, 3: 1, 9: 1, 21: 2
    }
  },
  {
    id: "user_thriller_mystery",
    name: "Marcus (Mystery & Thriller Fan)",
    ratings: {
      1: 4, 10: 5, 15: 5, 18: 4, 21: 5, 5: 1, 6: 2, 13: 2
    }
  },
  {
    id: "user_comedy_fan",
    name: "Sarah (Comedy Enthusiast)",
    ratings: {
      6: 4, 7: 5, 13: 5, 14: 5, 18: 4, 22: 5, 2: 1, 10: 2, 21: 1
    }
  },
  {
    id: "user_prestige_drama",
    name: "David (Prestige Drama Critic)",
    ratings: {
      2: 4, 4: 5, 11: 5, 12: 4, 15: 5, 16: 5, 17: 4, 23: 5, 13: 1, 14: 1
    }
  },
  {
    id: "user_action_adrenaline",
    name: "Jason (Action & Thriller Buff)",
    ratings: {
      1: 5, 3: 4, 8: 5, 9: 5, 17: 5, 20: 4, 5: 1, 24: 1
    }
  },
  {
    id: "user_animation_fan",
    name: "Chloe (Animation & Adventure Fan)",
    ratings: {
      19: 5, 20: 5, 2: 4, 12: 4, 22: 4, 16: 2, 21: 2
    }
  },
  {
    id: "user_classic_cinema",
    name: "Robert (Classic & Crime Drama Fan)",
    ratings: {
      11: 5, 16: 5, 17: 5, 8: 4, 5: 2, 13: 1, 14: 1
    }
  },
  {
    id: "user_indie_romcom",
    name: "Lily (Indie & Romance Fan)",
    ratings: {
      6: 5, 7: 5, 22: 4, 24: 5, 3: 1, 8: 1, 9: 1
    }
  },
  {
    id: "user_lighthearted",
    name: "Tina (Lighthearted Movie Fan)",
    ratings: {
      6: 4, 7: 4, 12: 5, 13: 4, 14: 4, 19: 5, 22: 5, 10: 1, 16: 1, 21: 1
    }
  }
];

if (typeof window !== "undefined") {
  window.MOVIES = MOVIES;
  window.SEED_USERS = SEED_USERS;
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = { MOVIES, SEED_USERS };
}
