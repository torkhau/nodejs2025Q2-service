import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AlbumModule,
  ArtistModule,
  FavoriteModule,
  TrackModule,
  UserModule,
} from './models';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
