import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityBase } from '../../db/abstract';

export abstract class BaseService<T extends EntityBase> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  // async findAllByIds(ids: string[]): Promise<T[]> {
  //   return this.items.filter((item) => ids.includes(item.id));
  // }

  async getById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const newItem = this.repository.create({ ...item } as unknown as T);

    return await this.repository.save(newItem);
  }

  async update(id: string, item: Partial<Omit<T, 'id'>>): Promise<T> {
    await this.repository.update(
      id,
      item as unknown as QueryDeepPartialEntity<T>,
    );

    return await this.getById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
