import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

@Injectable()
export class ByIdPipe<T extends { id: string }>
  implements PipeTransform<string, Promise<T>>
{
  constructor(
    private readonly service: { getById(id: string): Promise<T | null> },
  ) {}

  async transform(id: string): Promise<T> {
    const entity = await this.service.getById(id);

    if (!entity) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }

    return entity;
  }
}
