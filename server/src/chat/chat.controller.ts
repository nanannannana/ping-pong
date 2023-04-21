import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ObjectId } from 'mongoose';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/room')
  async findRoomId(
    @Query('name') roomName: number,
  ): Promise<{ roomID: string }> {
    return await this.chatService.findRoomId(roomName);
  }
}
