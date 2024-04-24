import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ProductSchema } from 'src/product/schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
