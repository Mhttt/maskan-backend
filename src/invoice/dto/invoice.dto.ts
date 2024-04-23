import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';

export class InvoiceDto {
  @IsString()
  @ApiProperty()
  readonly _id: string;

  @IsString()
  @ApiProperty()
  readonly orderId: string;

  @IsString()
  @ApiProperty()
  readonly customerId: string;

  @IsNumber()
  @ApiProperty()
  readonly invoiceNumber: number;

  @IsDate()
  @ApiProperty()
  readonly dateOfIssue: Date;

  @IsDate()
  @ApiProperty()
  readonly dueDate: Date;

  @IsDate()
  @ApiProperty()
  readonly deliveryDate: Date;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly vatPercentage: number;

  @IsNumber()
  @ApiProperty()
  readonly vatAmount: number;
}
