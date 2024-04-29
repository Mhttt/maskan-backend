import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { ShippingDetails } from './shippingDetails.schema';
import { ApiProperty } from '@nestjs/swagger';
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
export class ProductItem {
  @ApiProperty({ example: '60f1b3b3b9b1f3f3b4b1f3f3' })
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @ApiProperty({ example: 2 })
  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class Order extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  invoiceNumber: number;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ required: true })
  shippingDetails: ShippingDetails;

  @Prop({ required: true })
  paymentMethod: PaymentMethod;

  @Prop({ required: true })
  products: ProductItem[];

  @Prop({ required: true })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
