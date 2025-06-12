import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/db/track';
import { TrackByIdPipe } from './pipes';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService, TrackByIdPipe],
  exports: [TrackService],
})
export class TrackModule {}
