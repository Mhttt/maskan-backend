import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import mongoose from 'mongoose';
import { CreateCustomerDto } from './dtos/create-customer.dto';

export interface ICustomerQueryString {
  search: string;
  page: number;
}
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async findAll(query: ICustomerQueryString): Promise<Customer[]> {
    //TODO: Move to helper function and add to productpage
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const search = query.search
      ? {
          $or: [
            { name: { $regex: query.search, $options: 'i' } },
            { cvr: { $regex: query.search, $options: 'i' } },
            { company: { $regex: query.search, $options: 'i' } },
          ],
        }
      : {};

    const customers = await this.customerModel
      .find({ ...search })
      .limit(resPerPage)
      .skip(skip);
    return customers;
  }

  async create(customer: CreateCustomerDto): Promise<Customer> {
    const newCustomer = await new this.customerModel(customer);
    return newCustomer.save();
  }

  async findById(id: string): Promise<Customer> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid customer id');
    }

    const customer = await this.customerModel.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async updateById(id: string, customer: Customer): Promise<Customer> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid customer id');
    }

    return await this.customerModel.findByIdAndUpdate(id, customer, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Customer> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid customer id');
    }

    return await this.customerModel.findByIdAndDelete(id);
  }
}
