import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumByIdPipe } from './pipes';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumByIdPipe],
  exports: [AlbumService],
})
export class AlbumModule {}
