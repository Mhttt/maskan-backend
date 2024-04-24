import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class UserConfigs {
  @ApiProperty({ description: 'If the user is approved' })
  @Prop({ required: true, default: false })
  isApproved: boolean;

  @ApiProperty({ description: 'Discount percentage for the user' })
  @Prop({ required: true, default: 0 })
  discountPercentage: number;

  @ApiProperty({ description: 'If the user is allowed to have invoices' })
  @Prop({ required: true, default: false })
  invoiceAllowed: boolean;
}
