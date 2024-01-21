import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import {
  WINSTON_LOGGER_OPTIONS,
  WINSTON_LOGGER_TOKEN,
  WinstonLoggerService,
} from './winston-logger.service';

@Global()
@Module({})
export class WinstonLoggerModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonLoggerModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useClass: WinstonLoggerService,
        },
        {
          provide: WINSTON_LOGGER_OPTIONS,
          useValue: options,
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN, WINSTON_LOGGER_OPTIONS],
    };
  }
}
