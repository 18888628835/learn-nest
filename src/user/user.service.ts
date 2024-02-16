import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  // mock 数据
  db = [{ id: '123', name: 'qyx', password: '123456' }];

  async login(name: string, password: string) {
    const user = this.db.find((user) => user.name === name);

    if (!user || user.password !== password) {
      throw new HttpException('用户名或密码错误', HttpStatus.FORBIDDEN);
    }

    const accessToken = this.jwtService.sign(
      { name, id: user.id },
      { expiresIn: '30m' },
    );

    const refreshToken = this.jwtService.sign(
      { name, id: user.id },
      { expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = this.db.find((user) => user.id === data.id);
      const accessToken = this.jwtService.sign(
        { name: user.name, id: user.id },
        { expiresIn: '30m' },
      );
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
