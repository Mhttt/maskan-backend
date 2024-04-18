import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CustomerService, ICustomerQueryString } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDto } from './dto/customer.dto';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { ApiSuccessDecorator } from 'src/common/decorator/error/success.decorator';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all customers. Allows search as param for searching, or page as param for pagination. Admins only',
  })
  @ApiResponse({ status: 200, type: [CustomerDto] })
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async getAllCustomers(@Query() query: ICustomerQueryString): Promise<Customer[]> {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a single customer by id. Admins only',
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
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Create a new customer. Will also create a User in the user table with default password "Qwer1234". Admins only',
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
    return await this.customerService.create(customer);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single customer by id. Admins only',
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

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiSuccessDecorator(HttpStatus.OK, 'Customer was successfully deleted')
  @ApiOperation({
    summary: 'Delete a single customer by id. Admins only',
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
