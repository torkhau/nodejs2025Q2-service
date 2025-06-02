import { v4 } from 'uuid';

export abstract class BaseService<T extends { id: string }> {
  protected readonly items: T[] = [];

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async findAllByIds(ids: string[]): Promise<T[]> {
    return this.items.filter((item) => ids.includes(item.id));
  }

  async getById(id: string): Promise<T | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const newItem: T = { ...item, id: v4() } as T;

    this.items.push(newItem);

    return newItem;
  }

  async update(id: string, item: Partial<Omit<T, 'id'>>): Promise<T> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items[index] = { ...this.items[index], ...item };

    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }
}
