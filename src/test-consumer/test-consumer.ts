import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test')
export class TestConsumer {
  @Process('doSomething')
  async handle(job: Job) {
    console.log('Job Start');
    console.log('data', job.data);
  }

  // 进行中
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  // 完成
  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
