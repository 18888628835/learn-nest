import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}
  getHello() {
    const a = this.configService.get('DATABASE_USER');
    const b = this.configService.get('DATABASE_PASSWORD');
    const appEnv = this.configService.get('APP_ENV');
    const db = this.configService.get('db');
    return { a, b, appEnv, db };
  }
}
