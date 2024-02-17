import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('bbb')
export class BbbController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/')
  async getHello() {
    // return this.configService.get('db');
    return this.configService.get('bbb');
  }
}
