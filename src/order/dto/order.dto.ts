import { ShippingDetailsDto } from './shippingdetails.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

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

export class OrderDto {
  @IsNumber()
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly customerId: string;

  @ApiProperty()
  readonly invoiceId: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly orderDate: Date;

  @ApiProperty()
  readonly shippingDetails: ShippingDetailsDto;

  @ApiProperty()
  readonly paymentMethod: PaymentMethod;

  @ApiProperty()
  readonly products: ProductDto[];

  @ApiProperty()
  readonly status: OrderStatus;

  @ApiProperty()
  readonly history: string[];
}
