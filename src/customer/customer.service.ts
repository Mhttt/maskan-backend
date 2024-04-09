import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import mongoose from 'mongoose';
import { CreateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find();
    return customers;
  }

  async create(customer: CreateCustomerDto): Promise<Customer> {
    const newCustomer = await new this.customerModel(customer);
    return newCustomer.save();
  }
}
