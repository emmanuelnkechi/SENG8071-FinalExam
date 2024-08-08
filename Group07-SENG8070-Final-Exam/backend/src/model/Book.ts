import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './Author';
import { Publisher } from './Publisher';
import { BookFormat } from './BookFormat';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  book_id!: number;

  @Column()
  book_title!: string;

  @Column()
  book_genre!: string;

  @Column('decimal')
  book_price!: number;

  @Column('date')
  book_publish_date!: Date;

  @Column('decimal', { precision: 3, scale: 2 })
  book_average_rating!: number;

  @ManyToOne(() => BookFormat)
  book_format!: BookFormat;

  @ManyToOne(() => Author)
  author!: Author;

  @ManyToOne(() => Publisher)
  publisher!: Publisher;
}