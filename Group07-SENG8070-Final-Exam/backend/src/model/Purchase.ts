import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';
import { Book } from './Book';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  purchase_id!: number;

  @Column('date')
  purchase_date!: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_spent!: number;

  @ManyToOne(() => Customer)
  customer!: Customer;

  @ManyToOne(() => Book)
  book!: Book;
}