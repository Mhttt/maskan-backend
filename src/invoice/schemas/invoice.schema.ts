import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';
export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  @ApiProperty()
  UserId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  @ApiProperty()
  OrderId: Types.ObjectId;

  @Prop({ required: true }) //TODO: Should be unique and incremented by one each time FIX
  @ApiProperty()
  invoiceNumber: number;

  @Prop({ required: true })
  @ApiProperty()
  dateOfIssue: Date;

  @Prop({ required: true })
  @ApiProperty()
  dueDate: Date;

  @Prop({ required: true })
  @ApiProperty()
  deliveryDate: Date;

  @Prop({ required: true })
  @ApiProperty()
  vatPercentage: number;

  @Prop({ required: true })
  @ApiProperty()
  vatAmount: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
