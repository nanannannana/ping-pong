import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRepository } from './chat.repository';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class SocketGateway {
  constructor(private chatRepository: ChatRepository) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() { roomName, userNo },
    @ConnectedSocket() client: Socket,
  ) {
    // 생성하려는 room db에서 찾기
    const room = await this.chatRepository.findRoom({ roomName });
    // room에 입장
    client.join(roomName);

    // room이 없으면 db에 생성, 있으면 기존 room의 users에 사용자 추가
    if (!room) {
      const roomInfo = await this.chatRepository.createRoom({
        roomName,
        userNo,
      });
      client.emit('joined', { roomInfo: roomInfo, isNew: true });
    } else {
      if (room.users.indexOf(userNo) === -1) {
        await this.chatRepository.addUser({
          roomName,
          users: room.users.concat(userNo),
        });
        client.emit('joined', { roomInfo: room, isNew: true });
      } else {
        client.emit('joined', { roomInfo: room, isNew: false });
      }
    }
  }

  @SubscribeMessage('find-chats')
  async handleFindChat(
    @MessageBody() { roomName, roomID, isNew, nickname },
    @ConnectedSocket() client: Socket,
  ) {
    // 최신 30개의 메세지만 가져옴
    const chats = await this.chatRepository.findChat({ roomID });
    console.log('chats', chats);
    client.emit('prev-chats', chats);

    if (isNew) {
      console.log('확인2', roomName);
      const notice = await this.chatRepository.addChat({
        message: `${nickname}님이 들어왔습니다.`,
        user: null,
        room: roomID,
        notice: true,
      });
      this.server.to(roomName).emit('notice', notice);
      client.emit('is-exsiting', { isNew: false });
    }
  }

  @SubscribeMessage('send-chat')
  async handlerSendChat(@MessageBody() { message, user, room }) {
    await this.chatRepository.addChat({
      message,
      user,
      room: room.roomID,
      notice: false,
    });
    this.server.to(room.roomName).emit('new-chat', {
      message,
      user: { _id: user },
      notice: false,
    });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnection(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
