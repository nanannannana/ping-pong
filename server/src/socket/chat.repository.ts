import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatRepository {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
}
