import { ShippingDetailsDto } from './shippingdetails.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { Customer } from 'src/customer/schemas/customer.schema';
import { Invoice } from 'src/invoice/schemas/invoice.schema';
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
  readonly orderNumber: number;

  @ApiProperty()
  readonly customer: Customer;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly invoice: Invoice;

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
