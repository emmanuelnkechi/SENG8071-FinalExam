import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  author_id!: number;

  @Column({ length: 150 })
  author_name!: string;
}