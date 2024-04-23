import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;

export const variantSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  images: string[];

  @Prop()
  stock: number;

  @Prop()
  sku: number;

  @Prop({ type: variantSchema })
  variant: typeof variantSchema;

  @Prop()
  category: string[];

  @Prop()
  industry: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
