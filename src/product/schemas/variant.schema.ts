import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class ProductVariant {
  @ApiProperty({ description: 'Name of the product variant' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Description of the product variant' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Images of the product variant' })
  @Prop({ required: true })
  images: string[];
}
