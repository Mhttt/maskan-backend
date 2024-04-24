import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ShippingDetails } from './shippingDetails.schema';
export type OrderDocument = HydratedDocument<Order>;

export enum PaymentMethod {
  CREDITCARD = 'CREDITCARD',
  INVOICE = 'INVOICE',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

@Schema()
export class Order extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customerId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Invoice',
  })
  invoiceId: Types.ObjectId;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ required: true })
  shippingDetails: ShippingDetails;

  @Prop({ required: true })
  paymentMethod: PaymentMethod;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  products: Types.ObjectId[];

  @Prop({ required: true })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
