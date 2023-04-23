import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  // kakao 인증 시작
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req) {
    return;
  }

  // kakao 로그인 성공
  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(@Req() req, @Res() res): void {
    req.session.accessToken = req.user.accessToken;
    req.session.userID = req.user.userNo;
    res.redirect(
      `http://${this.configService.get<string>('CLIENT_URI')}/?user-no=${
        req.user.userNo
      }&nickname=${req.user.nickname}`,
    );
  }

  @Get('logout')
  userLogout(@Req() req, @Res() res): void {
    // req.logout();
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  }

  @Get('/unlink')
  async KakaoLogout(@Req() req, @Res() res) {
    await this.httpService
      .post(`https://kapi.kakao.com/v1/user/unlink`, null, {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      })
      .toPromise()
      .then(async (response) => {
        if (response.status === 200 || response.status === 401) {
          await this.authService.userDelete({ userID: req.session.userID });
          req.session.destroy();
          return res.redirect(
            `http://${this.configService.get<string>(
              'CLIENT_URI',
            )}/?unlink=success`,
          );
        } else {
          return res.redirect(
            `http://${this.configService.get<string>(
              'CLIENT_URI',
            )}/?unlink=failed`,
          );
        }
      });
  }
}
