import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NestBullModule } from 'src/nest-bull/nest-bull.module';
import { UserConsumer } from './user-consumer';

@Module({
  imports: [NestBullModule.register('user', UserConsumer)],
  controllers: [UserController],
})
export class UserModule {}
