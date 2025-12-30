export const movies = [
  {
    id: 1,
    title: "Black Panther",
    year: 2018,
    rating: 8.0,
    category: "Movies",
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    desc: "The king of Wakanda rises."
  },
  {
    id: 2,
    title: "Pirates of the Caribbean",
    year: 2007,
    rating: 8.2,
    category: "Movies",
    genre: "Adventure",
    poster: "https://m.media-amazon.com/images/I/71zji3aER6L._AC_SL1055_.jpg",
    desc: "A swashbuckling adventure on the high seas."
  },
  {
    id: 3,
    title: "Money Heist",
    year: 2017,
    rating: 8.7,
    category: "Series",
    genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    desc: "A mastermind leads a heist."
  },
  {
    id: 4,
    title: "The Last of Us",
    year: 2023,
    rating: 9.2,
    category: "Series",
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    desc: "Survival in a post-apocalyptic world."
  }
];

export const categories = ["All", "Movies", "Series"];

export const rows = [
  { key: "trending", title: "แนะนำ / Trending", filter: (m) => m.rating >= 8.0 },
  { key: "movies", title: "ภาพยนตร์ยอดนิยม", filter: (m) => m.category === "Movies" },
  { key: "series", title: "ซีรีส์แนะนำ", filter: (m) => m.category === "Series" }
];
