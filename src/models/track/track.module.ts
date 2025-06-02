import { forwardRef, Module } from '@nestjs/common';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackByIdPipe } from './pipes';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [forwardRef(() => FavoriteModule)],
  controllers: [TrackController],
  providers: [TrackService, TrackByIdPipe],
  exports: [TrackService],
})
export class TrackModule {}
