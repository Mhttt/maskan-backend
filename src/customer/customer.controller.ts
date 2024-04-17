import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CustomerService, ICustomerQueryString } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDto } from './dto/customer.dto';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { ApiSuccessDecorator } from 'src/common/decorator/error/success.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all customers. Allows search as param for searching, or page as param for pagination',
  })
  @ApiResponse({ status: 200, type: [CustomerDto] })
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async getAllCustomers(@Query() query: ICustomerQueryString): Promise<Customer[]> {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single customer by id.',
  })
  @ApiResponse({ status: 200, type: CustomerDto })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The customer with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
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
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async createCustomer(
    @Body(ValidationPipe)
    customer: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a single customer by id',
  })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The customer with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async updateCustomer(
    @Param('id')
    id: string,
    @Body()
    customer: UpdateCustomerDto,
  ): Promise<UpdateCustomerDto> {
    return this.customerService.updateById(id, customer);
  }

  @Delete(':id')
  @ApiSuccessDecorator(HttpStatus.OK, 'Customer was successfully deleted')
  @ApiOperation({
    summary: 'Delete a single customer by id',
  })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The customer with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async deleteCustomer(
    @Param('id')
    id: string,
  ): Promise<SuccessDto> {
    await this.customerService.deleteById(id);
    return {
      message: 'Customer was successfully deleted',
      status_code: HttpStatus.OK,
    };
  }
}
