import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module, Provider } from '@nestjs/common';

@Module({})
export class NestBullModule {
  static register(queueName: string, consumer: Provider): DynamicModule {
    const testQueue = BullModule.registerQueue({
      name: queueName,
    });
    const testBoard = BullBoardModule.forFeature({
      name: queueName,
      adapter: BullAdapter,
    });

    return {
      module: NestBullModule,
      imports: [testBoard, testQueue],
      providers: [consumer, ...testQueue.providers],
      exports: [consumer, ...testQueue.exports],
    };
  }
}
