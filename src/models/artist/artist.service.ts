import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/db/artist';
import { Repository } from 'typeorm';
import { BaseService } from '../abstract';

@Injectable()
export class ArtistService extends BaseService<Artist> {
  protected readonly entityName = 'artist';

  constructor(
    @InjectRepository(Artist)
    artistRepository: Repository<Artist>,
  ) {
    super(artistRepository);
  }
}
