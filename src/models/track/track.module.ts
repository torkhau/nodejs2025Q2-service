import { Module } from '@nestjs/common';
import { TrackByIdPipe } from './pipes';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackByIdPipe],
})
export class TrackModule {}
