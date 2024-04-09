import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customer/customer.schema';
import { Product } from 'src/product/product.schema';
import { Invoice } from 'src/invoice/invoice.schema';
import { addressSchema } from 'src/customer/customer.schema';
export type OrderDocument = HydratedDocument<Order>;

const paymentMethodSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['CREDITCARD', 'INVOICE'],
    default: 'CREDITCARD',
  },
});

const orderStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
    default: 'PENDING',
  },
});

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

  @Prop({ required: true })
  shippingDetails: typeof addressSchema;

  @Prop({ required: true })
  paymentMethod: typeof paymentMethodSchema;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[];

  @Prop({ required: true })
  status: typeof orderStatusSchema;

  @Prop()
  history: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
