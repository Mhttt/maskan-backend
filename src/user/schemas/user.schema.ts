import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';
export type CustomerDocument = HydratedDocument<User>;

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema()
export class User extends Document {
  @ApiProperty({ description: 'Email of the user' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Roles of the user' })
  @Prop({ required: true, type: [String], enum: Role, default: [Role.USER] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
