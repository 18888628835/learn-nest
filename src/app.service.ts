import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('CONFIG_OPTIONS') private readonly options: Record<string, any>,
  ) {}

  getHello(): string {
    console.log(this.options);
    return 'Hello World!';
  }
}
