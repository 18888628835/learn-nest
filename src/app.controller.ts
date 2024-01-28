import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionService } from './session/session.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    @Inject(SessionService)
    private readonly sessionService: SessionService,
    @Inject(AppService)
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async count(@Req() req: Request, @Res() res: Response) {
    const sid = req.cookies?.sid;

    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );

    const count = session ? Number(session.count) + 1 : 1;

    const curId = await this.sessionService.setSession(sid, { count }, 60);
    res.cookie('sid', curId, {
      maxAge: 1000 * 60,
      httpOnly: true,
    });

    res.status(200).send(`count: ${count}`);
  }
}
