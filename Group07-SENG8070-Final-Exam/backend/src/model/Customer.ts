import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id!: number;

  @Column({ length: 150 })
  cust_name!: string;

  @Column({ length: 150 })
  email_address!: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total_spent!: number | null;
}