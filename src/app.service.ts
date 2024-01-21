import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('test')
    private readonly testQueue: Queue,
  ) {}

  async getHello(): Promise<string> {
    const queue = await this.testQueue.add('doSomething', { foo: 'bar' });
    console.log('——————🚀🚀🚀🚀🚀 —— getHello —— queue.id:', queue.id);
    return 'Hello World!';
  }
}
