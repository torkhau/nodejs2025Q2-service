import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { LOG_LEVELS_ORDER, LogLevel } from './log-levels.enum';

const LOGS_DIR = path.join(process.cwd(), 'logs');

@Injectable()
export class CustomLoggingService implements LoggerService {
  private logFilePath: string;
  private errorLogFilePath: string;
  private currentLogLevelIndex: number;
  private maxLogFileSizeKB: number;
  private context = 'NestApp';

  constructor(private readonly configService: ConfigService) {
    this.ensureLogsDirectoryExists();

    const configuredLogLevel =
      this.configService.get('LOG_LEVEL') || LogLevel.LOG;
    this.maxLogFileSizeKB = Number(
      this.configService.get('LOG_FILE_MAX_SIZE_KB') || 100,
    );

    this.logFilePath = path.join(LOGS_DIR, 'combined.log');
    this.errorLogFilePath = path.join(LOGS_DIR, 'errors.log');

    this.currentLogLevelIndex = LOG_LEVELS_ORDER.indexOf(
      configuredLogLevel as LogLevel,
    );

    if (this.currentLogLevelIndex === -1) {
      console.warn(
        `Invalid LOG_LEVEL environment variable: ${configuredLogLevel}. Defaulting to LOG.`,
      );
      this.currentLogLevelIndex = LOG_LEVELS_ORDER.indexOf(LogLevel.LOG);
    }
  }

  private ensureLogsDirectoryExists() {
    if (!fs.existsSync(LOGS_DIR)) {
      fs.mkdirSync(LOGS_DIR, { recursive: true });
    }
  }

  private canLog(level: LogLevel): boolean {
    const requestedLevelIndex = LOG_LEVELS_ORDER.indexOf(level);

    return (
      requestedLevelIndex !== -1 &&
      requestedLevelIndex <= this.currentLogLevelIndex
    );
  }

  private rotateLogFile(filePath: string) {
    const maxLogFileSizeBytes = this.maxLogFileSizeKB * 1024;
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > maxLogFileSizeBytes) {
        const timestamp = new Date()
          .toISOString()
          .replace(/:/g, '-')
          .replace(/\..+/, '');
        const newFilePath = `${filePath}.${timestamp}.old`;
        fs.renameSync(filePath, newFilePath);
        console.log(`Log file rotated: ${filePath} -> ${newFilePath}`);
      }
    }
  }

  private writeLogToFile(
    level: LogLevel,
    message: string,
    filePath: string,
    stack?: string,
  ) {
    this.rotateLogFile(filePath);
    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}] [${this.context}] ${message}${stack ? `\nStack: ${stack}` : ''}\n`;
    fs.appendFile(filePath, logEntry, (err) => {
      if (err)
        process.stderr.write(
          `[ERROR] Failed to write log to file ${filePath}: ${err.message}\n`,
        );
    });
  }

  log(message: any, context?: string) {
    if (!this.canLog(LogLevel.LOG)) return;

    const ctx = context || this.context;
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    process.stdout.write(`[LOG] ${ctx ? `[${ctx}] ` : ''}${msg}\n`);
    this.writeLogToFile(LogLevel.LOG, msg, this.logFilePath);
  }

  error(message: any, trace?: string, context?: string) {
    if (!this.canLog(LogLevel.ERROR)) return;

    const ctx = context || this.context;
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    process.stderr.write(
      `[ERROR] ${ctx ? `[${ctx}] ` : ''}${msg}${trace ? `\nStack: ${trace}` : ''}\n`,
    );
    this.writeLogToFile(LogLevel.ERROR, msg, this.errorLogFilePath, trace);
    this.writeLogToFile(LogLevel.ERROR, msg, this.logFilePath, trace);
  }

  warn(message: any, context?: string) {
    if (!this.canLog(LogLevel.WARN)) return;

    const ctx = context || this.context;
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    process.stdout.write(`[WARN] ${ctx ? `[${ctx}] ` : ''}${msg}\n`);
    this.writeLogToFile(LogLevel.WARN, msg, this.logFilePath);
  }

  debug(message: any, context?: string) {
    if (!this.canLog(LogLevel.DEBUG)) return;

    const ctx = context || this.context;
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    process.stdout.write(`[DEBUG] ${ctx ? `[${ctx}] ` : ''}${msg}\n`);
    this.writeLogToFile(LogLevel.DEBUG, msg, this.logFilePath);
  }

  verbose(message: any, context?: string) {
    if (!this.canLog(LogLevel.VERBOSE)) return;

    const ctx = context || this.context;
    const msg = typeof message === 'object' ? JSON.stringify(message) : message;
    process.stdout.write(`[VERBOSE] ${ctx ? `[${ctx}] ` : ''}${msg}\n`);
    this.writeLogToFile(LogLevel.VERBOSE, msg, this.logFilePath);
  }
}
