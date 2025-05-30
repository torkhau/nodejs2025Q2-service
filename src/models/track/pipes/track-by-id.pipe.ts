import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Track } from '../interfaces';
import { TrackService } from '../track.service';

@Injectable()
export class TrackByIdPipe implements PipeTransform<string, Promise<Track>> {
  constructor(private readonly service: TrackService) {}

  async transform(id: string): Promise<Track> {
    const user = await this.service.getById(id);

    if (!user) throw new NotFoundException(`Track with id "${id}" not found`);

    return user;
  }
}
