import { OrderDto } from 'src/order/dtos/order.dto';

export class InvoiceDto {
  readonly order: OrderDto;
  readonly invoiceNumber: number;
  readonly dateOfIssue: Date;
  readonly dueDate: Date;
  readonly deliveryDate: Date;
  readonly vatPercentage: number;
  readonly vatAmount: number;
}
