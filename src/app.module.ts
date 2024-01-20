import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyFirstModule } from './my-first/my-first.module';

@Module({
  imports: [MyFirstModule.register({ name: 'Dynamic Module' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
