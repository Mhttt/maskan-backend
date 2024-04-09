import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/order.schema';
import { Invoice } from 'src/invoice/invoice.schema';
export type CustomerDocument = HydratedDocument<Customer>;

export const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
});

@Schema()
export class Customer {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, minlength: 8, maxlength: 8 })
  cvr: number;

  @Prop({ required: true })
  invoiceAddress: typeof addressSchema;

  @Prop({ required: true })
  shippingAddress: typeof addressSchema;

  @Prop({ required: true })
  invoiceAllowed: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }] })
  invoices: Invoice[];

  @Prop()
  discountPercentage: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
