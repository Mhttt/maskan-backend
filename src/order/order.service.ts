import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}

  async createOrder(order: Order): Promise<Order> {
    const exists = await this.orderModel.exists({ invoiceNumber: order.invoiceNumber });

    if (exists) {
      throw new ConflictException(`Order with invoice number ${order.invoiceNumber} already exist`);
    }

    try {
      const newOrder = await new this.orderModel(order);
      return newOrder.save();
    } catch (error) {
      throw new ConflictException('Error creating order');
    }
  }
}
