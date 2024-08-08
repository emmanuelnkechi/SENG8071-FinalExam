// Define the ICRUDService interface
export interface ICRUDService<T> {
  create(item: T): Promise<T>;
  read(id: number): Promise<T | null>;
  update(id: number, item: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  list(): Promise<T[]>;
}

// Define the Book interface
export interface Book {
  book_id?: number;
  book_title: string;
  book_genre: string;
  book_price: number;
  book_publish_date: Date;
  book_average_rating: number;
  book_format_id: number;
  author_id: number;
  publisher_id: number;
}
