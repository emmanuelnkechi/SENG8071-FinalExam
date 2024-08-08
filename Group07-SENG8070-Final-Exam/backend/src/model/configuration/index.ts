import { DataSource } from 'typeorm';
import { Book } from '../Book';
import { Author } from '../Author';
import { Publisher } from '../Publisher';
import { BookFormat } from '../BookFormat';
import { Customer } from '../Customer';
import { Purchase } from '../Purchase';
import { Review } from '../Review';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'db',
    synchronize: true,
    logging: true,
    entities: [Book, Author, Publisher, BookFormat, Customer, Purchase, Review],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });