import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filter';
import { CustomLoggingService } from './common/logger';
import { LoggerMiddleware } from './common/middleware';
import {
  AlbumModule,
  ArtistModule,
  AuthModule,
  FavoriteModule,
  TrackModule,
  UserModule,
} from './models';
import { GlobalAuthGuard } from './models/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT') || '5433'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    AlbumModule,
    ArtistModule,
    AuthModule,
    FavoriteModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: GlobalAuthGuard },
    {
      provide: APP_FILTER,
      useFactory: (logger: Logger) => {
        return new AllExceptionsFilter(logger);
      },
      inject: [Logger],
    },
    { provide: Logger, useClass: CustomLoggingService },
    CustomLoggingService,
    LoggerMiddleware,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
