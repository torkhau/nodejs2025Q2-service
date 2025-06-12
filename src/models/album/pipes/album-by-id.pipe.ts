import { Injectable } from '@nestjs/common';
import { ByIdPipe } from 'src/common';
import { AlbumService } from '../album.service';
import { Album } from '../interfaces';

@Injectable()
export class AlbumByIdPipe extends ByIdPipe<Album> {
  constructor(service: AlbumService) {
    super(service);
  }
}
