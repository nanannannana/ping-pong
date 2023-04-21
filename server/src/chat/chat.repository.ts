import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';
import { Room } from './room.schema';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Room.name) private RoomModel: Model<Room>,
  ) {}

  async findRoom({ roomName }): Promise<Room> {
    return this.RoomModel.findOne({ roomName });
  }
  async createRoom({ roomName, userNo }): Promise<Room> {
    console.log('roomName', roomName);
    return this.RoomModel.create({ roomName, host: userNo, users: [userNo] });
  }

  async addUser({ roomName, users }) {
    return this.RoomModel.updateOne({ roomName }, { users });
  }

  async findChat({ roomID }) {
    return this.chatModel
      .find({ room: roomID })
      .populate({
        path: 'user',
        select: '_id',
      })
      .select('message notice')
      .sort({ createdAt: 1 })
      .limit(30);
  }

  async addChat({ message, user, room, notice }) {
    return await this.chatModel.create({ message, user, room, notice });
  }
}
