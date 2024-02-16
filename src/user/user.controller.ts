import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './LoginUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.userService.login(body.name, body.password);
  }

  @Get('refreshToken')
  async refreshToken(@Query('refresh_token') refreshToken: string) {
    return this.userService.refreshToken(refreshToken);
  }
}
