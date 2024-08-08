import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BookFormat {
  @PrimaryGeneratedColumn()
  book_format_id!: number;

  @Column({ length: 50 })
  book_format_name!: string;
}