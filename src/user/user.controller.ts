import { Controller, Get, Inject } from '@nestjs/common';
import {
  WINSTON_LOGGER_TOKEN,
  WinstonLoggerService,
} from 'src/winston-logger/winston-logger.service';

@Controller()
export class UserController {
  constructor(
    @Inject(WINSTON_LOGGER_TOKEN)
    private readonly logger: WinstonLoggerService,
  ) {}

  @Get('/user')
  getUser() {
    this.logger.log(
      JSON.stringify({ name: 'John', age: 20 }),
      'UserController',
    );
    return { name: 'John', age: 20 };
  }
}
