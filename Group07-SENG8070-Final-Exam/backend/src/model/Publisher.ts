import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  publisher_id!: number;

  @Column({ length: 150 })
  publisher_name!: string;
}