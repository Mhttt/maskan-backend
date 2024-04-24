import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';
import { Invoice } from 'src/invoice/schemas/invoice.schema';
import { ApiProperty } from '@nestjs/swagger';
import { UserConfigs } from './userconfig.schema';
import { Address } from './address.schema';
export type CustomerDocument = HydratedDocument<User>;

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Schema()
export class User extends Document {
  @ApiProperty({ description: 'Name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Name of the company' })
  @Prop({ required: true })
  company: string;

  @ApiProperty({ description: 'Email of the user' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Company CVR number. Must have length 8' })
  @Prop({ required: true, minlength: 8, maxlength: 8 })
  cvr: string;

  @ApiProperty({ description: 'Invoice address details' })
  @Prop({ required: true })
  invoiceAddress: Address;

  @ApiProperty({ description: 'Shipping address details' })
  @Prop({ required: true })
  shippingAddress: Address;

  @ApiProperty({ description: 'All orders the customer has made' })
  @Prop({ type: [{ type: Order, ref: 'Order' }], required: false })
  orders: Order[];

  @ApiProperty({ description: 'All invoices for the customer' })
  @Prop({ type: [{ type: Invoice, ref: 'Invoice' }], required: false })
  invoices: Invoice[];

  @ApiProperty({ description: 'User configuration for the user' })
  @Prop({ required: true })
  userConfigs: UserConfigs;

  @ApiProperty({ description: 'Roles of the user' })
  @Prop({ required: true, type: [String], enum: Role, default: [Role.CUSTOMER] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
