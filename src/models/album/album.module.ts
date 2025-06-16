import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/db/album';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumByIdPipe } from './pipes';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumByIdPipe],
  exports: [AlbumService],
})
export class AlbumModule {}
