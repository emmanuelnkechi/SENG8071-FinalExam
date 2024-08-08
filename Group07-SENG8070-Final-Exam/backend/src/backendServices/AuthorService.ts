import { Repository } from 'typeorm';
import { Author } from '../model/Author';
import { ICRUDService } from '../utils/interface/index';
import { AppDataSource } from '../model/configuration';

export class AuthorService implements ICRUDService<Author> {
  private authorRepository: Repository<Author>;

  constructor() {
    this.authorRepository = AppDataSource.getRepository(Author);
  }

  async create(item: Author): Promise<Author> {
    return await this.authorRepository.save(item);
  }

  async read(id: number): Promise<Author | null> {
    return await this.authorRepository.findOneBy({ author_id: id });
  }

  async update(id: number, item: Partial<Author>): Promise<Author | null> {
    await this.authorRepository.update(id, item);
    return this.read(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.authorRepository.delete(id);
    return result.affected !== 0;
  }

  async list(): Promise<Author[]> {
    return await this.authorRepository.find();
  }
}
