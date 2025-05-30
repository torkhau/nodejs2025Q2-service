import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Album } from '../interfaces';
import { AlbumService } from '../album.service';

@Injectable()
export class AlbumByIdPipe implements PipeTransform<string, Promise<Album>> {
  constructor(private readonly service: AlbumService) {}

  async transform(id: string): Promise<Album> {
    const user = await this.service.getById(id);

    if (!user) throw new NotFoundException(`Album with id "${id}" not found`);

    return user;
  }
}
