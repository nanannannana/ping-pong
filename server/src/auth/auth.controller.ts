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
    res.redirect(
      `http://${this.configService.get<string>('CLIENT_URI')}?token=${
        req.user.accessToken
      }`,
    );
  }
}
