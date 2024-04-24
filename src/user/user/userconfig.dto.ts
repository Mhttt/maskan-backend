import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { ApprovalStatus, UserPermissions } from '../schemas/userconfig.schema';

export class UserConfigsDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Approvalstatus of the customer. Can be pending, approved or rejected.',
    example: ApprovalStatus.APPROVED,
  })
  readonly approvalstatus: ApprovalStatus;

  @IsNumber()
  @ApiProperty({ description: 'Discount percentage for the customer', example: 10 })
  readonly discountPercentage: number;

  @IsBoolean()
  @ApiProperty({
    description: 'User specific permissions. For instance all customers can pay with credit card (creditcard-allowed)',
    example: [UserPermissions.CCALLOWED, UserPermissions.INVOICEALLOWED],
  })
  readonly userPermissions: UserPermissions[];
}
