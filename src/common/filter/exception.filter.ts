// src/common/filters/http-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger, // Используем общий тип Logger NestJS
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === 'object' && message !== null && 'message' in message
          ? (message as any).message
          : message,
    };

    this.logger.error(
      `[${request.method}] ${request.url} - ${status} - ${JSON.stringify(errorResponse)}`,
      exception instanceof Error ? exception.stack : undefined,
      'ExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
