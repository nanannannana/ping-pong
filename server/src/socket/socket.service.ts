import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

@Injectable()
export class SocketService {
  constructor(private chatRepository: ChatRepository) {}
}
