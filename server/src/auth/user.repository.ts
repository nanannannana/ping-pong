import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // 회원 등록
  async createUser(registerDto: RegisterDto): Promise<{ message: string }> {
    const { email, password, nickname } = registerDto;

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);

    // 회원가입 성공 시, signup success return
    try {
      await this.userModel.create({
        email,
        password: hashedPW,
        nickname,
      });
      return { message: 'signup success' };
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Duplicate Email value');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // 회원 찾기
  async findOne({ email }): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
