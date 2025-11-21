export interface Cast {
  name: string;
  role: string;
  image: string;
}

export interface Movie {
  id: string;
  title: string;
  genre: string[];
  duration: number; // in minutes
  rating: number;
  poster: string;
  description: string;
  showtimes: string[];
  price: number;
  cast: Cast[];
  trailerUrl: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Cyberpunk: Edgerunners",
    genre: ["Action", "Sci-Fi", "Anime"],
    duration: 120,
    rating: 4.8,
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    description:
      "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw — an edgerunner.",
    showtimes: ["10:00", "13:00", "16:00", "19:00", "22:00"],
    price: 120000,
    cast: [
      {
        name: "David Martinez",
        role: "Main Protagonist",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Lucy",
        role: "Netrunner",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Rebecca",
        role: "Solo",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      },
    ],
    trailerUrl: "https://www.youtube.com/embed/JtqIas3bYhg",
  },
  {
    id: "2",
    title: "Neon Genesis",
    genre: ["Sci-Fi", "Mecha", "Psychological"],
    duration: 115,
    rating: 4.5,
    poster:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80",
    description:
      "Teenagers pilot giant robots to protect Earth from alien beings known as Angels.",
    showtimes: ["11:00", "14:00", "17:00", "20:00"],
    price: 110000,
    cast: [
      {
        name: "Shinji Ikari",
        role: "Pilot Unit 01",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Rei Ayanami",
        role: "Pilot Unit 00",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Asuka Langley",
        role: "Pilot Unit 02",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
    ],
    trailerUrl: "https://www.youtube.com/embed/13nSISwxrY4",
  },
  {
    id: "3",
    title: "Blade Runner 2049",
    genre: ["Sci-Fi", "Thriller"],
    duration: 164,
    rating: 4.7,
    poster:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80",
    description:
      "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    showtimes: ["09:30", "12:30", "15:30", "18:30", "21:30"],
    price: 130000,
    cast: [
      {
        name: "Ryan Gosling",
        role: "K",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Harrison Ford",
        role: "Rick Deckard",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Ana de Armas",
        role: "Joi",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
    ],
    trailerUrl: "https://www.youtube.com/embed/gCcx85zbxz4",
  },
  {
    id: "4",
    title: "Akira",
    genre: ["Action", "Sci-Fi", "Animation"],
    duration: 124,
    rating: 4.6,
    poster:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    description:
      "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be saved by two teenagers and a group of psychics.",
    showtimes: ["10:30", "13:30", "16:30", "19:30"],
    price: 115000,
    cast: [
      {
        name: "Kaneda",
        role: "Biker Gang Leader",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Tetsuo",
        role: "Antagonist",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
    ],
    trailerUrl: "https://www.youtube.com/embed/nA8KmHC2Z-g",
  },
  {
    id: "5",
    title: "Ghost in the Shell",
    genre: ["Sci-Fi", "Action", "Crime"],
    duration: 83,
    rating: 4.4,
    poster:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    description:
      "A cyborg policewoman and her partner hunt a mysterious and powerful hacker called the Puppet Master.",
    showtimes: ["12:00", "15:00", "18:00", "21:00"],
    price: 110000,
    cast: [
      {
        name: "Motoko Kusanagi",
        role: "Major",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Batou",
        role: "Ranger",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      },
    ],
    trailerUrl: "https://www.youtube.com/embed/SvBVDibOrgs",
  },
];
