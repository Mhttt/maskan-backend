import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import * as dayjs from 'dayjs';

export class InvoiceDto {
  @IsString()
  @ApiProperty()
  readonly orderId: string;

  @IsString()
  @ApiProperty()
  readonly userId: string;

  @IsNumber()
  @ApiProperty()
  readonly invoiceNumber: number;

  @IsString()
  @ApiProperty({ example: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ[Z]') })
  readonly dateOfIssue: string;

  @IsString()
  @ApiProperty({ example: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ[Z]') })
  readonly dueDate: string;

  @IsString()
  @ApiProperty({ example: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ[Z]') })
  readonly deliveryDate: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly vatPercentage: number;

  @IsNumber()
  @ApiProperty()
  readonly vatAmount: number;
}
