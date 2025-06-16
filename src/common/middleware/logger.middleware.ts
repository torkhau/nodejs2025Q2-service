import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const startTime = Date.now();

    this.logger.log(
      `[REQ] ${method} ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
      'RequestLogger',
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('Content-Length');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `[RES] ${method} ${originalUrl} | Status: ${statusCode} | Content-Length: ${contentLength || 'N/A'} | Time: ${responseTime}ms`,
        'ResponseLogger',
      );
    });

    next();
  }
}
