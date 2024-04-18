import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new customer',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid customer input')
  @ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
  async createCustomer(
    @Body(ValidationPipe)
    user: User,
  ): Promise<User> {
    return this.userService.create(user);
  }
}
