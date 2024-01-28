import {
  Controller,
  Get,
  Inject,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
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

  @Get('/token')
  async getToken() {
    const newToken = await this.jwtService.sign({ name: 'John' });

    return { accessToken: newToken };
  }

  @Get('/verify')
  async verifyToken(@Headers('authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '');
    try {
      const result = this.jwtService.verify(token);
      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
