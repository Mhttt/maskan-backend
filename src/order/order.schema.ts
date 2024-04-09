import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customer/customer.schema';
import { Address } from 'src/customer/customer.types';
import { Product } from 'src/product/product.schema';
import { OrderStatus, PaymentMethod } from './order.types';
import { Invoice } from 'src/invoice/invoice.schema';
export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customer: Customer;

  @Prop({ required: true })
  price: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  })
  invoiceDetails: Invoice;

  @Prop({ type: Object, required: true })
  shippingInfo: Address;

  @Prop({ required: true })
  paymentMethod: PaymentMethod;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[];

  @Prop({ required: true })
  status: OrderStatus;

  @Prop()
  history: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
