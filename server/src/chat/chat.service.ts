import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  async findRoomId(roomName: number): Promise<{ roomID: string }> {
    const room = await this.chatRepository.findRoom({ roomName });
    return { roomID: room._id };
  }
}
