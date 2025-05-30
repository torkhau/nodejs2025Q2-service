import { Injectable } from '@nestjs/common';
import { ByIdPipe } from 'src/common';
import { Track } from '../interfaces';
import { TrackService } from '../track.service';

@Injectable()
export class TrackByIdPipe extends ByIdPipe<Track> {
  constructor(service: TrackService) {
    super(service);
  }
}
