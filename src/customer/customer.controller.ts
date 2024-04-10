import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService, ICustomerQueryString } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDto } from './dto/customer.dto';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all customers. Allows search as param for searching, or page as param for pagination',
  })
  @ApiResponse({ status: 200, type: [CustomerDto] })
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
  @ApiOperation({
    summary: 'Create a new customer',
  })
  @ApiBody({
    type: CreateCustomerDto,
  })
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request',
    'Invalid customer input',
  )
  @ApiErrorDecorator(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Internal Server',
    'There was an internal server error',
  )
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
