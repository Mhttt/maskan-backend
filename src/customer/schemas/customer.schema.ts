import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';
import { Invoice } from 'src/invoice/schemas/invoice.schema';
import { ApiProperty } from '@nestjs/swagger';
export type CustomerDocument = HydratedDocument<Customer>;

export const addressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true, minLength: 4, maxLength: 4 },
  country: { type: String, required: true },
});
@Schema()
export class Customer {
  @ApiProperty({ description: 'Name of the company' })
  @Prop({ required: true })
  company: string;

  @ApiProperty({ description: 'Name of the customer' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Email of the customer' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Company CVR number. Must have length 8' })
  @Prop({ required: true, minlength: 8, maxlength: 8 })
  cvr: string;

  @ApiProperty({ description: 'Invoice address details' })
  @Prop({ type: Object, required: true })
  invoiceAddress: typeof addressSchema;

  @ApiProperty({ description: 'Shipping address details' })
  @Prop({ type: Object, required: true })
  shippingAddress: typeof addressSchema;

  @ApiProperty({
    description: 'True if customer is allowed to pay by invoice. Else they can only pay by credit card.',
  })
  @Prop({ required: true })
  invoiceAllowed: boolean;

  @ApiProperty({ description: 'All orders the customer has made' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @ApiProperty({ description: 'All invoices for the customer' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }] })
  invoices: Invoice[];

  @ApiProperty({
    description: 'The discount amount in percentage pr product this customer should recieve',
  })
  @Prop({ required: true })
  discountPercentage: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
