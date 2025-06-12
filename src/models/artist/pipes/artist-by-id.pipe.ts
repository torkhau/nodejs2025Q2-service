import { Injectable } from '@nestjs/common';
import { ByIdPipe } from 'src/common';
import { ArtistService } from '../artist.service';
import { Artist } from '../interfaces';

@Injectable()
export class ArtistByIdPipe extends ByIdPipe<Artist> {
  constructor(service: ArtistService) {
    super(service);
  }
}
