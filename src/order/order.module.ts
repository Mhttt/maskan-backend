import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderController } from './order.controller';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { AutoIncrementID, AutoIncrementIDOptions } from '@typegoose/auto-increment';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: async () => {
          const schema = OrderSchema;

          schema.plugin(AutoIncrementID, {
            field: 'invoiceNumber',
            startAt: 1,
          } satisfies AutoIncrementIDOptions);

          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
