import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/register')
  register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ): Promise<{ nickname: string }> {
    // 토큰 session에 저장
    const { accessToken, nickname } = await this.authService.login(loginDto);
    session.accessToken = accessToken;
    return { nickname };
  }

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
    res.redirect(
      `http://${this.configService.get<string>('CLIENT_URI')}?nickname=${
        req.user.nickname
      }`,
    );
  }
}
