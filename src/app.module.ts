import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule, UserModule } from './models';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
