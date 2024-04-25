import { ShippingDetailsDto } from './shippingdetails.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import * as dayjs from 'dayjs';
import { ProductItem } from '../schemas/order.schema';

enum PaymentMethod {
  CREDITCARD = 'CreditCard',
  INVOICE = 'Invoice',
}

enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Proccessing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
}

export class CreateOrderDto {
  @IsString()
  @ApiProperty({ example: '60f1b3b3b9b1f3f3b4b1f3f3' })
  readonly userId: string;

  @IsNumber()
  @ApiProperty({ example: 100 })
  readonly price: number;

  @IsString()
  @ApiProperty({ example: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ') })
  readonly orderDate: string;

  @ValidateNested({ each: true })
  @ApiProperty()
  readonly shippingDetails: ShippingDetailsDto;

  @ApiProperty({ example: PaymentMethod.CREDITCARD })
  readonly paymentMethod: PaymentMethod;

  @IsArray()
  @ApiProperty({ type: [ProductItem] })
  readonly products: ProductItem[];

  @ApiProperty({ example: OrderStatus.PENDING })
  readonly status: OrderStatus;
}
