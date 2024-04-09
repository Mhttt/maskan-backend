import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Order } from 'src/order/order.schema';
import { Address } from './customer.types';
export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cvr: number;

  @Prop({ type: Object, required: true })
  invoiceAddress: Address;

  @Prop({ type: Object,  required: true })
  shippingAddress: Address;

  @Prop({ required: true })
  invoiceAllowed: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Prop()
  discountPercentage: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
