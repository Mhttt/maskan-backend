import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  images: File[];

  @Prop()
  stock: number;

  @Prop()
  sku: number;

  @Prop()
  variant: string;

  @Prop()
  category: string[];

  @Prop()
  industry: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
