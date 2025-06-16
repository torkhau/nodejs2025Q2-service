import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLoggingService } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const startTime = Date.now();

    this.logger.forceLog(
      `[REQ] ${method} ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
      'RequestLogger',
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('Content-Length');
      const responseTime = Date.now() - startTime;

      this.logger.forceLog(
        `[RES] ${method} ${originalUrl} | Status: ${statusCode} | Content-Length: ${contentLength || 'N/A'} | Time: ${responseTime}ms`,
        'ResponseLogger',
      );
    });

    next();
  }
}
