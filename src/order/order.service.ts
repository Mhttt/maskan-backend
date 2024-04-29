import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}

  async createOrder(order: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = await new this.orderModel({ ...order, invoiceNumber: 0 }); //Number doesn't matter will always increment by one based on amount of invoices in db
      return newOrder.save();
    } catch (error) {
      throw new ConflictException('Error creating order');
    }
  }
}
