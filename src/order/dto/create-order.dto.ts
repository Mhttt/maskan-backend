import { ShippingDetailsDto } from './shippingdetails.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import * as dayjs from 'dayjs';

enum PaymentMethod {
  CREDITCARD = 'CREDITCARD',
  INVOICE = 'INVOICE',
}

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  readonly UserId: string;

  @IsString()
  @ApiProperty()
  readonly invoiceId: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsString()
  @ApiProperty({ example: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ[Z]') })
  readonly orderDate: string;

  @ValidateNested({ each: true })
  @Type(() => ShippingDetailsDto)
  @ApiProperty()
  readonly shippingDetails: ShippingDetailsDto;

  @ApiProperty()
  readonly paymentMethod: PaymentMethod;

  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty()
  readonly products: ProductDto[];

  @ApiProperty()
  readonly status: OrderStatus;
}
