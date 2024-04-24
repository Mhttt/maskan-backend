import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/user/schemas/address.schema';

export enum Courier {
  UPS = 'UPS',
  FedEx = 'FedEx',
  DHL = 'DHL',
  DAO = 'DAO',
  POSTNORD = 'PostNord',
  GLS = 'GLS',
  BRING = 'Bring',
}

@Schema({ _id: false })
export class ShippingDetails {
  @ApiProperty({ description: 'Address details regarding shipment' })
  @Prop({ required: true })
  shippingAddress: Address;

  @ApiProperty({ description: 'Date of shipment' })
  @Prop({ required: true })
  shippingDate: Date;

  @ApiProperty({ description: 'Name of the courirer deliveirng the order' })
  @Prop({ required: true })
  carrier: Courier;

  @ApiProperty({ description: 'Tracking number of the order' })
  @Prop({ required: true })
  trackingNumber: string;
}
