import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
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

//TODO: Should be imported from customer module FIX
const addressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true, minLength: 4, maxLength: 4 },
  country: { type: String, required: true },
});

const shippingDetailsSchema = new mongoose.Schema({
  deliveryAddress: { type: String, required: true },
  shipDate: { type: Date, required: true },
  carrier: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  shippingAddress: { type: addressSchema, required: true },
});
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

  @Prop({ type: Object, required: true })
  shippingDetails: typeof shippingDetailsSchema;

  @Prop({ type: Object, required: true })
  paymentMethod: typeof paymentMethodSchema;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  products: Product[];

  @Prop({ type: Object, required: true })
  status: typeof orderStatusSchema;

  @Prop()
  history: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
