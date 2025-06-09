import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistByIdPipe } from './pipes';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe],
  exports: [ArtistService],
})
export class ArtistModule {}
