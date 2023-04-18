import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { LoginDto, RegisterDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    return this.userRepository.createUser(registerDto);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; nickname: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ email });

    // id/pw 일치 시, 토큰 생성
    if (user && (await bcrypt.compare(password, user.password))) {
      // payload에 email 추가
      const payload = { email };
      // 토큰 생성: secret + payload
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken, nickname: user.nickname };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
