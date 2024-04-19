import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Role, User } from './schemas/user.schema';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/common/decorator/error/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new user. Admin only',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unathorized', 'Not authorized')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async createCustomer(
    @Body(ValidationPipe)
    user: User,
  ): Promise<User> {
    return this.userService.create(user);
  }
}
