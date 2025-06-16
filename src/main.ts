import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { join } from 'node:path';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter';
import { CustomLoggingService } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const customLogger = app.get(CustomLoggingService);
  app.useLogger(customLogger);

  app.useGlobalFilters(new AllExceptionsFilter(customLogger));

  process.on('uncaughtException', (error: Error, origin: string) => {
    customLogger.error(
      `[UNCAUGHT EXCEPTION] Caught exception: ${error.message} (Origin: ${origin})`,
      error.stack,
      'ProcessUnhandled',
    );
    setTimeout(() => process.exit(1), 1000);
  });
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    customLogger.error(
      `[UNHANDLED REJECTION] Reason: ${reason instanceof Error ? reason.message : JSON.stringify(reason)} | Promise: ${JSON.stringify(promise)}`,
      reason instanceof Error ? reason.stack : undefined,
      'ProcessUnhandled',
    );
    setTimeout(() => process.exit(1), 1000);
  });

  const openAPIObject = YAML.load(
    join(__dirname, '..', 'doc', 'api.yaml'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, openAPIObject);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number | string>('PORT') || 4000;

  await app.listen(port);
}
bootstrap();
