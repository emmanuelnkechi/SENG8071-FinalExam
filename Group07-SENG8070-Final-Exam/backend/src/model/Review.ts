import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';
import { Book } from './Book';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column('date')
  review_date!: Date;

  @Column('decimal', { precision: 3, scale: 2 })
  rating!: number;

  @Column('text', { nullable: true })
  comment!: string | null;

  @ManyToOne(() => Customer)
  customer!: Customer;

  @ManyToOne(() => Book)
  book!: Book;
}