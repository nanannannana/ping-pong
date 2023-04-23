import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}
}
