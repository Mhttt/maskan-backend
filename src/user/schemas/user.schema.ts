import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';
import { Invoice } from 'src/invoice/schemas/invoice.schema';
import { ApiProperty } from '@nestjs/swagger';
export type CustomerDocument = HydratedDocument<User>;

export const addressSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true, minLength: 4, maxLength: 4 },
    country: { type: String, required: true },
  },
  { _id: false },
);

export const userConfigs = new mongoose.Schema(
  {
    isApproved: { type: Boolean, required: true, default: false },
    discountPercentage: { type: Number, required: true, default: 0 },
    invoiceAllowed: { type: Boolean, required: true, default: false },
  },
  { _id: false },
);

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Schema()
export class User extends Document {
  @ApiProperty({ description: 'Name of the customer' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Name of the company' })
  @Prop({ required: true })
  company: string;

  @ApiProperty({ description: 'Email of the customer' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Company CVR number. Must have length 8' })
  @Prop({ required: true, minlength: 8, maxlength: 8 })
  cvr: string;

  @ApiProperty({ description: 'Invoice address details' })
  @Prop({ type: addressSchema, required: true })
  invoiceAddress: typeof addressSchema;

  @ApiProperty({ description: 'Shipping address details' })
  @Prop({ type: addressSchema, required: true })
  shippingAddress: typeof addressSchema;

  @ApiProperty({ description: 'All orders the customer has made' })
  @Prop({ type: [{ type: Order, ref: 'Order' }], required: false })
  orders: Order[];

  @ApiProperty({ description: 'All invoices for the customer' })
  @Prop({ type: [{ type: Invoice, ref: 'Invoice' }], required: false })
  invoices: Invoice[];

  @ApiProperty({ description: 'User configuration for the customer' })
  @Prop({ type: userConfigs, required: true })
  userConfigs: typeof userConfigs;

  @ApiProperty({ description: 'Roles of the user' })
  @Prop({ required: true, type: [String], enum: Role, default: [Role.CUSTOMER] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
