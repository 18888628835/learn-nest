import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dOw3PBgUtaxMMQ6ZanTFyS6mzfNYGBqSuNuYvG86tZI=',
      signOptions: {
        expiresIn: '7d',
      },
      global: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
