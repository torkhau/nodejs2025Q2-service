import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistByIdPipe } from './pipes';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  imports: [forwardRef(() => FavoriteModule)],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe],
  exports: [ArtistService],
})
export class ArtistModule {}
