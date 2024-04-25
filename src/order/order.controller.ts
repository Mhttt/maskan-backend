import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { BaseController } from 'src/common/util/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
@ApiTags('Orders')
@Controller('orders')
export class OrderController extends BaseController {
  constructor(private orderService: OrderService) {
    super();
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new order. Admins only',
  })
  @ApiBody({
    type: CreateOrderDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Order })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid User input')
  async createUserAsAdmin(
    @Body(ValidationPipe)
    order: CreateOrderDto,
  ): Promise<Order> {
    return await this.orderService.createOrder(order);
  }
}
