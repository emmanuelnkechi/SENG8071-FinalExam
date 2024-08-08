import { Repository } from 'typeorm';
import { Book } from '../model/Book';
import { ICRUDService } from '../utils/interface/index';
import { AppDataSource } from '../model/configuration';

export class BookService implements ICRUDService<Book> {
  private bookRepository: Repository<Book>;

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book);
  }

  async create(item: Book): Promise<Book> {
    return await this.bookRepository.save(item);
  }

  async read(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ book_id: id });
  }

  async update(id: number, item: Partial<Book>): Promise<Book | null> {
    await this.bookRepository.update(id, item);
    return this.read(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    return result.affected !== 0;
  }

  async list(): Promise<Book[]> {
    return await this.bookRepository.find();
  }
}