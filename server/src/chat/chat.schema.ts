import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Room } from './room.schema';

@Schema({ collection: 'chats' })
export class Chat {
  _id: string;

  @Prop()
  message: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  })
  room: Room;

  @Prop()
  notice: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
