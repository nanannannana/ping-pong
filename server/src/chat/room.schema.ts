import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chat } from './chat.schema';
import { User } from 'src/auth/user.schema';
import { IsNumber } from 'class-validator';

@Schema({ collection: 'rooms' })
export class Room {
  _id: string;

  @IsNumber()
  @Prop({ unique: true })
  roomName: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  host: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
