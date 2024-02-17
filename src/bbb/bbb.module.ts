import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(() => {
      return {
        bbb: 'bbbbbb',
      };
    }),
  ],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
