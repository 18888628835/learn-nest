import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from './login.guard';

@Controller()
@UseGuards(LoginGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
