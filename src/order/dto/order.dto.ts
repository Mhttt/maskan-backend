import { CustomerDto } from 'src/customer/dto/customer.dto';
import { InvoiceDto } from 'src/invoice/dto/invoice.dto';
import { ShippingDetailsDto } from './shippingdetails.dto';
import { ProductDto } from 'src/product/dto/product.dto';

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
  readonly orderNumber: number;
  readonly customer: CustomerDto;
  readonly price: number;
  readonly invoice: InvoiceDto;
  readonly orderDate: Date;
  readonly shippingDetails: ShippingDetailsDto;
  readonly paymentMethod: PaymentMethod;
  readonly products: ProductDto[];
  readonly status: OrderStatus;
  readonly history: string[];
}
