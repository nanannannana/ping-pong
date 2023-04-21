import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private userRepository: UserRepository) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user: User = await this.userRepository.findOne({
      email: profile._json.kakao_account.email,
    });

    if (!user) {
      const createdUser: User = await this.userRepository.createUser({
        email: profile._json.kakao_account.email,
        nickname: profile.displayName,
      });
      return {
        accessToken,
        nickname: profile.displayName,
        userNo: createdUser._id,
      };
    }
    return { accessToken, nickname: profile.displayName, userNo: user._id };
  }
}
