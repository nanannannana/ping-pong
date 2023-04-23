import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Chat } from 'src/chat/chat.schema';
import { Room } from 'src/chat/room.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
  ) {}

  // 회원 등록
  async createUser(userDto: UserDto): Promise<User> {
    const { email, nickname } = userDto;

    // 회원가입 성공 시, signup success return
    try {
      return await this.userModel.create({
        email,
        nickname,
      });
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

  async delUser({ userID }) {
    await this.userModel.deleteOne({ _id: userID });
    await this.roomModel.deleteMany({ host: userID });
    await this.roomModel.updateMany({ $pull: { users: userID } });
  }
}
