import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { NestBullModule } from './nest-bull/nest-bull.module';
import { TestConsumer } from './test-consumer/test-consumer';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/bull/queues',
      adapter: ExpressAdapter,
    }),
    NestBullModule.register('test', TestConsumer),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
