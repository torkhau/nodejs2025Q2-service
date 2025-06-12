import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/db/artist';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistByIdPipe } from './pipes';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistByIdPipe],
  exports: [ArtistService],
})
export class ArtistModule {}
