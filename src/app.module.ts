import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { SessionService } from './session/session.service';

@Module({
  imports: [RedisModule],
  controllers: [AppController],
  providers: [AppService, SessionService],
})
export class AppModule {}
