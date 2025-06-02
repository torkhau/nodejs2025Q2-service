import { forwardRef, Module } from '@nestjs/common';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumByIdPipe } from './pipes';

@Module({
  imports: [forwardRef(() => FavoriteModule), forwardRef(() => TrackModule)],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumByIdPipe],
  exports: [AlbumService],
})
export class AlbumModule {}
