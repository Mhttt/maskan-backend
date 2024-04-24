import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';
import { ProductVariant } from './variant.schema';
export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product extends Document {
  @ApiProperty({ description: 'Name of the product' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Description of the product' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Price of product in DKK' })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ description: 'Amount of stock available' })
  @Prop({ required: true })
  stock: number;

  @ApiProperty({ description: 'Unique SKU number for the product. Must be 8 digits' })
  @Prop({ required: true, unique: true })
  sku: string;

  @ApiProperty({ description: 'Object containing information about the variant' })
  @Prop({ required: false })
  variant?: ProductVariant[];

  @ApiProperty({ description: 'List of image links for the product' })
  @Prop({ required: true })
  images: string[];

  @ApiProperty({ description: 'List of categories the product belongs to' })
  @Prop({ required: true })
  category: string[];

  @ApiProperty({ description: 'List of industries the product is related to' })
  @Prop({ required: true })
  industry: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
