import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  _id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
