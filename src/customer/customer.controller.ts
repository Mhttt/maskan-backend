import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService, ICustomerQueryString } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomers(
    @Query() query: ICustomerQueryString,
  ): Promise<Customer[]> {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  async getCustomerById(
    @Param('id')
    id: string,
  ): Promise<Customer> {
    return this.customerService.findById(id);
  }

  @Post()
  async createCustomer(
    @Body(ValidationPipe)
    customer: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id')
    id: string,
    @Body()
    customer: Customer,
  ): Promise<Customer> {
    return this.customerService.updateById(id, customer);
  }

  @Delete(':id')
  async deleteCustomer(
    @Param('id')
    id: string,
  ): Promise<Customer> {
    return this.customerService.deleteById(id);
  }
}
