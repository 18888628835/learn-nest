import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BbbModule } from './bbb/bbb.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env', `.env.${process.env.NODE_ENV}`],
      load: [config],
      isGlobal: true,
    }),
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
