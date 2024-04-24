import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { IUserQueryString, UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { UpdateCustomerDto } from './dto/update-user.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { ApiSuccessDecorator } from 'src/common/decorator/error/success.decorator';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role, User } from 'src/user/schemas/user.schema';
import { Public } from 'src/common/decorator/error/routeAuth.decorator';
import { BaseController } from 'src/common/util/base.controller';
import { CreateUserAsAdminDto } from './dto/create-user-admin.dto';
import { CreateUserAsCustomerDto } from './dto/create-user-customer.dto';

@ApiTags('Users')
@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users. Allows search as param for searching, or page as param for pagination. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unathorized', 'Not authorized')
  async getAllUsers(@Query() query: IUserQueryString): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a single user by id. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The user with the provided id was not found')
  async getuserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new user. Admins only',
  })
  @ApiBody({
    type: CreateUserAsAdminDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid User input')
  async createUserAsAdmin(
    @Body(ValidationPipe)
    user: CreateUserAsAdminDto,
  ): Promise<User> {
    return await this.userService.createAsAdmin(user);
  }

  @Post('/user')
  @Public()
  @ApiOperation({
    summary: 'Create a new user as a customer. No authentication required',
  })
  @ApiBody({
    type: CreateUserAsCustomerDto,
  })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid user input')
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  async createUserAsCustomer(
    @Body(ValidationPipe)
    user: CreateUserAsCustomerDto,
  ): Promise<User> {
    return await this.userService.createAsUser(user);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single user by id. Admins only',
  })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The user with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid user input')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: UpdateCustomerDto,
  ): Promise<UpdateCustomerDto> {
    return this.userService.updateById(id, user);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiSuccessDecorator(HttpStatus.OK, 'User was successfully deleted')
  @ApiOperation({
    summary: 'Delete a single user by id. Admins only',
  })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The user with the provided id was not found')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<SuccessDto> {
    await this.userService.deleteById(id);
    return {
      message: 'User was successfully deleted',
      status_code: HttpStatus.OK,
    };
  }
}
