import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class SocketGateway {
  constructor(private socketService: SocketService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): void {
    console.log(data);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnection(@ConnectedSocket() socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }
}
