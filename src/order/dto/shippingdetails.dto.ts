import { InvoiceAddressDto } from 'src/customer/dto/invoiceaddress.dto';

export class ShippingDetailsDto {
  readonly deliveryAddress: string;
  readonly shipDate: Date;
  readonly carrier: string;
  readonly trackingNumber: string;
  readonly shippingAddress: InvoiceAddressDto;
}
