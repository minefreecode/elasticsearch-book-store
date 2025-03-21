//Определяем тип Book
export type Book = {
  bookId: string;
  title: string;
  series: string;
  author: string;
  rating: string;
  description: string;
  language: string;
  isbn: string;
  genres: string[];
  characters: string[];
  pages: string;
  publisher: string;
  publishDate: string;
  awards: string[];
  numRatings: string;
  ratingsByStars: string[];
  likedPercent: string;
  storySetting: string[];
  coverImg: string;
};
