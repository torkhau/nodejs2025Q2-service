import { Get } from '@nestjs/common';
import { BaseService } from './base.service';

export abstract class BaseController<T extends { id: string }, DTO> {
  constructor(protected readonly service: BaseService<T>) {}

  abstract toDTO(item: T): DTO;

  @Get()
  async findAll() {
    const items = await this.service.getAll();

    return items.map(this.toDTO.bind(this));
  }
}
