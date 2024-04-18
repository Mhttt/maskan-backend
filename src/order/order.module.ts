import { Module } from '@nestjs/common';
import { OrderSchema } from './schemas/order.schema';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrderController],
})
export class OrderModule {}
