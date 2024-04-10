import { ShippingDetailsDto } from './shippingdetails.dto';
import { ProductDto } from 'src/product/dtos/product.dto';
import { Customer } from 'src/customer/schemas/customer.schema';
import { Invoice } from 'src/invoice/schemas/invoice.schema';

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
  readonly customer: Customer;
  readonly price: number;
  readonly invoice: Invoice;
  readonly orderDate: Date;
  readonly shippingDetails: ShippingDetailsDto;
  readonly paymentMethod: PaymentMethod;
  readonly products: ProductDto[];
  readonly status: OrderStatus;
  readonly history: string[];
}
