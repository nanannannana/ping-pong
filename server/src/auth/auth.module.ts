import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: 60 * 60 },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ defaultStrategy: 'kakao' }),
    HttpModule,
  ],
  providers: [AuthService, UserRepository, KakaoStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
