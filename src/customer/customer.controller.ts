import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Post()
  async createCustomer(
    @Body()
    customer: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(customer);
  }
}
