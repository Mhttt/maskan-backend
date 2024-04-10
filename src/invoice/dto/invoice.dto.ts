import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly orderId: string;

  @ApiProperty()
  readonly customerId: string;

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
