import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('user')
export class UserController {
  constructor(
    @InjectQueue('user')
    private readonly userQueue: Queue,
  ) {}

  @Get()
  async getUser() {
    const queue = await this.userQueue.add('doSomething', { name: 'foo' });
    console.log('——————🚀🚀🚀🚀🚀 —— getUser —— queue.id:', queue.id);
    return 'Hello User!';
  }
}
