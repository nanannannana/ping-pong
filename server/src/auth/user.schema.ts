import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chat } from 'src/chat/chat.schema';
import { Room } from 'src/chat/room.schema';

@Schema({ collection: 'users' })
export class User {
  _id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  nickname: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] })
  // room: Room[];
}

export const UserSchema = SchemaFactory.createForClass(User);
