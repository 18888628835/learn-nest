import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLoggerModule } from './winston-logger/winston-logger.module';
import { UserModule } from './user/user.module';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
@Module({
  imports: [
    WinstonLoggerModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ context, level, message }) => {
              const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
              const appStr = chalk.green(`[Nest]`);
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),

        new winston.transports.DailyRotateFile({
          level: 'debug',
          dirname: 'logs',
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
