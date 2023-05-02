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
    origin: [`${process.env.CLIENT_URI}`],
  },
})
export class SocketGateway {
  constructor(private chatRepository: ChatRepository) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('find-rooms')
  async handleFindRooms(
    @MessageBody() user: string,
    @ConnectedSocket() client: Socket,
  ) {
    // console.log('확인', user);
    const rooms: any = await this.chatRepository.isInRoom(user);
    client.emit('is-in-rooms', rooms);
    rooms.forEach((v: { users: { _id: string; nickname: string } }) =>
      client.emit('members', v.users),
    );
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() { roomName, userNo },
    @ConnectedSocket() client: Socket,
  ) {
    // 생성하려는 room db에서 찾기
    const room = await this.chatRepository.findRoom({ roomName });
    // // room에 입장
    // client.join(roomName);

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

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() roomName, @ConnectedSocket() client: Socket) {
    client.join(roomName);
    // console.log(
    //   '방에 속한 사람',
    //   this.server.sockets.adapter.rooms.get(roomName),
    // );
  }

  @SubscribeMessage('find-chats')
  async handleFindChat(
    @MessageBody() { roomName, roomID, isNew, nickname },
    @ConnectedSocket() client: Socket,
  ) {
    // console.log('isNew', isNew);
    // 최신 30개의 메세지만 가져옴
    const chats = await this.chatRepository.findChat({ roomID });
    // console.log('chats', chats);
    client.emit('prev-chats', chats);

    // 첫 입장인 경우, notice 전송
    if (isNew === 'true') {
      const notice = await this.chatRepository.addChat({
        message: `${nickname}님이 들어왔습니다.`,
        user: null,
        room: roomID,
        notice: true,
      });
      this.server.to(roomName).emit('notice', notice);
    }
  }

  @SubscribeMessage('send-chat')
  async handlerSendChat(@MessageBody() { message, user, room }) {
    // console.log(
    //   '내 방에 있는 사람들',
    //   this.server.sockets.adapter.rooms.get(room.roomName),
    // );
    await this.chatRepository.addChat({
      message,
      user: user.id,
      room: room.roomID,
      notice: false,
    });
    this.server.to(room.roomName).emit('new-chat', {
      message,
      user: { _id: user.id, nickname: user.nickname },
      notice: false,
    });
  }

  @SubscribeMessage('withdrawal')
  async handelWithdrawal(
    @MessageBody() { roomName, userNo }: { roomName: number; userNo: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 방을 나가는 사람이 host일 경우, room 삭제
    const result = await this.chatRepository.deleteRoom({
      roomName,
      host: userNo,
    });
    // console.log('result', result);
    // 방을 나가는 사람이 host가 아닐 경우, user_list에서 해당 user 삭제
    if (result.deletedCount === 0) {
      const check = await this.chatRepository.updateRoom({ roomName, userNo });
      // console.log('check', check);
    }
    const rooms: any = await this.chatRepository.isInRoom(userNo);
    client.emit('is-in-rooms', rooms);
    rooms.forEach((v: { users: { _id: string; nickname: string } }) =>
      client.emit('members', v.users),
    );
    client.leave(roomName.toString());
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnection(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
