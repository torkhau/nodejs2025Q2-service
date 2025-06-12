import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/db/album';
import { Repository } from 'typeorm';
import { BaseService } from '../abstract';

@Injectable()
export class AlbumService extends BaseService<Album> {
  protected readonly entityName = 'album';

  constructor(
    @InjectRepository(Album)
    albumRepository: Repository<Album>,
  ) {
    super(albumRepository);
  }
}
