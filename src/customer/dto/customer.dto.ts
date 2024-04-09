import { InvoiceDto } from 'src/invoice/dto/invoice.dto';
import { OrderDto } from 'src/order/dto/order.dto';
import { InvoiceAddressDto } from './invoiceaddress.dto';

export class CustomerDto {
  readonly name: string;
  readonly email: string;
  readonly cvr: number;
  readonly invoiceAddress: InvoiceAddressDto;
  readonly shippingAddress?: InvoiceAddressDto;
  readonly invoiceAllowed: boolean;
  readonly orders: OrderDto[];
  readonly invoices: InvoiceDto[];
  readonly discountPercentage?: number;
}

export type CreateCustomerDto = Omit<CustomerDto, 'orders' | 'invoices'>;
