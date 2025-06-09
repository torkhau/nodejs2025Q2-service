import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { join } from 'node:path';
import * as YAML from 'yamljs';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

console.log(join(__dirname, '..', 'doc', 'api.yaml'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
