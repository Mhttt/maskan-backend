import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from 'src/order/dto/order.dto';

export class InvoiceDto {
  @ApiProperty()
  readonly order: OrderDto;

  @ApiProperty()
  readonly invoiceNumber: number;

  @ApiProperty()
  readonly dateOfIssue: Date;

  @ApiProperty()
  readonly dueDate: Date;

  @ApiProperty()
  readonly deliveryDate: Date;

  @ApiProperty()
  readonly vatPercentage: number;

  @ApiProperty()
  readonly vatAmount: number;
}
