import { ShippingDetailsDto } from './shippingdetails.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsString()
  @ApiProperty()
  readonly _id: string;

  @IsString()
  @ApiProperty()
  readonly customerId: string;

  @IsString()
  @ApiProperty()
  readonly invoiceId: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsDate()
  @ApiProperty()
  readonly orderDate: Date;

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

  @IsArray()
  @ApiProperty()
  readonly history: string[];
}
