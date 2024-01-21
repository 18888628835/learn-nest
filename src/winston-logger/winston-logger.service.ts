import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

export const WINSTON_LOGGER_OPTIONS = 'WINSTON_LOGGER_OPTIONS';
export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER_TOKEN';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(
    @Inject(WINSTON_LOGGER_OPTIONS)
    private options: winston.LoggerOptions,
  ) {
    this.logger = winston.createLogger(this.options);
  }

  log(message: string, context?: string) {
    this.logger.log({ level: 'info', message, context });
  }

  error(message: string | object, context?: string) {
    this.logger.error({ level: 'error', message, context });
  }

  warn(message: string | object, context?: string) {
    this.logger.warn({ level: 'warn', message, context });
  }

  debug(message: string | object, context?: string) {
    this.logger.debug({ level: 'debug', message, context });
  }
}
