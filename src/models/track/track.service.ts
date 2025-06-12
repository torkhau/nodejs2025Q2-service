import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/db/track';
import { Repository } from 'typeorm';
import { BaseService } from '../abstract';

@Injectable()
export class TrackService extends BaseService<Track> {
  protected readonly entityName = 'track';

  constructor(
    @InjectRepository(Track)
    trackRepository: Repository<Track>,
  ) {
    super(trackRepository);
  }
}
