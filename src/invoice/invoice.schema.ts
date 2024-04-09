import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/order.schema';
export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  Order: Order;

  @Prop({ required: true })
  invoiceNumber: number;

  @Prop({ required: true })
  dateOfIssue: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  deliveryDate: Date;

  @Prop()
  vatPercentage: number;

  @Prop({ required: true })
  vatAmount: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
