export interface Movie {
  id: number;
  title: string;
  stock_count: number;
}

export interface RentalResponse {
  id: number;
  rentDate: string;
  movie: Movie;
}