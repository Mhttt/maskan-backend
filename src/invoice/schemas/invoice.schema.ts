import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  @ApiProperty()
  CustomerId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  @ApiProperty()
  OrderId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  invoiceNumber: number;

  @Prop({ required: true })
  @ApiProperty()
  dateOfIssue: Date;

  @Prop({ required: true })
  @ApiProperty()
  dueDate: Date;

  @Prop()
  @ApiProperty()
  deliveryDate: Date;

  @Prop()
  @ApiProperty()
  vatPercentage: number;

  @Prop({ required: true })
  @ApiProperty()
  vatAmount: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
