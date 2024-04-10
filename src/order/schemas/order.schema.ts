import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { addressSchema } from 'src/customer/schemas/customer.schema';
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

const shippingDetailsSchema = new mongoose.Schema({
  deliveryAddress: { type: String, required: true },
  shipDate: { type: Date, required: true },
  carrier: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  shippingAddress: { type: addressSchema, required: true },
});

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customerId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  })
  invoiceId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ type: Object })
  shippingDetails: typeof shippingDetailsSchema;

  @Prop({ type: Object, required: true })
  paymentMethod: typeof paymentMethodSchema;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[];

  @Prop({ type: Object, required: true })
  status: typeof orderStatusSchema;

  @Prop()
  history: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
