import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.schema';
import { ChatRepository } from './chat.repository';
import { Room, RoomSchema } from './room.schema';
import { User } from 'src/auth/user.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [SocketGateway, ChatService, ChatRepository],
  exports: [ChatRepository, ChatService],
})
export class ChatModule {}
