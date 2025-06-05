import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackModule } from '../track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistByIdPipe } from './pipes';

@Module({
  imports: [
    forwardRef(() => FavoriteModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe],
  exports: [ArtistService],
})
export class ArtistModule {}
