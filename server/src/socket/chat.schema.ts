import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'chat', _id: true })
export class Chat {
  id: string;

  @Prop()
  roomName: number;

  @Prop()
  nickname: string;

  @Prop()
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
