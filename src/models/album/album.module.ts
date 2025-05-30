import { Module } from '@nestjs/common';
import { AlbumByIdPipe } from './pipes';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumByIdPipe],
})
export class AlbumModule {}
