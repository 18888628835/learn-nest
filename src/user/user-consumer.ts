import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('user')
export class UserConsumer {
  @Process('doSomething')
  async handle(job: Job) {
    await job.log('Job Start');
    await job.log(`data${job.data}`);
    return 'success';
  }
}
