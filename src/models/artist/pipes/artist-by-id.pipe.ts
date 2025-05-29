import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ArtistService } from '../artist.service';
import { Artist } from '../interfaces';

@Injectable()
export class ArtistByIdPipe implements PipeTransform<string, Promise<Artist>> {
  constructor(private readonly service: ArtistService) {}

  async transform(id: string): Promise<Artist> {
    const artist = await this.service.getById(id);

    if (!artist)
      throw new NotFoundException(`Artist with id "${id}" not found`);

    return artist;
  }
}
