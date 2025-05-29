import { Module } from '@nestjs/common';
import { ArtistByIdPipe } from './pipes';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe],
})
export class ArtistModule {}
