export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  LOG = 'log',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
}

export const LOG_LEVELS_ORDER: LogLevel[] = [
  LogLevel.ERROR,
  LogLevel.WARN,
  LogLevel.LOG,
  LogLevel.VERBOSE,
  LogLevel.DEBUG,
];
