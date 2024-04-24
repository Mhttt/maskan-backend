import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UserConfigsDto {
  @IsBoolean()
  @ApiProperty({ description: 'If the customer has been marked as approved by admin in the system.', example: true })
  readonly isApproved: boolean;

  @IsNumber()
  @ApiProperty({ description: 'Discount percentage for the customer', example: 10 })
  readonly discountPercentage: number;

  @IsBoolean()
  @ApiProperty({ description: 'If the customer is allowed to pay with invoice', example: true })
  readonly invoiceAllowed: boolean;
}
