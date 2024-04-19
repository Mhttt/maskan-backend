import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CustomerService, ICustomerQueryString } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerAsAdminDto } from './dto/create-customer-admin.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { ApiSuccessDecorator } from 'src/common/decorator/error/success.decorator';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';
import { Public } from 'src/common/decorator/error/routeAuth.decorator';
import { CreateCustomerAsUserDto } from './dto/create-customer-user.dto';
import { BaseController } from 'src/common/util/base.controller';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController extends BaseController {
  constructor(private customerService: CustomerService) {
    super();
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all customers. Allows search as param for searching, or page as param for pagination. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [Customer] })
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unathorized', 'Not authorized')
  async getAllCustomers(@Query() query: ICustomerQueryString): Promise<Customer[]> {
    return this.customerService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a single customer by id. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Customer })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The customer with the provided id was not found')
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
    summary: 'Create a new customer. Will also create a User in the user table with default password. Admins only',
  })
  @ApiBody({
    type: CreateCustomerAsAdminDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Customer })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
  async createCustomerAsAdmin(
    @Body(ValidationPipe)
    customer: CreateCustomerAsAdminDto,
  ): Promise<Customer> {
    return await this.customerService.createAsAdmin(customer);
  }

  @Post('/user')
  @Public()
  @ApiOperation({
    summary: 'Create a new customer as user',
  })
  @ApiBody({
    type: CreateCustomerAsUserDto,
  })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
  @ApiResponse({ status: HttpStatus.CREATED, type: Customer })
  async createCustomerAsUser(
    @Body(ValidationPipe)
    customer: CreateCustomerAsUserDto,
  ): Promise<Customer> {
    return await this.customerService.createAsUser(customer);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single customer by id. Admins only',
  })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The customer with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
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
