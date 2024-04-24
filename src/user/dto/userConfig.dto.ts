import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ApprovalStatus, UserPermissions } from '../schemas/userconfig.schema';

export class UserConfigsDto {
  @ApiProperty({
    description: 'Approval status of the user. Can be approved, pending or rejected',
    example: ApprovalStatus.PENDING,
  })
  approvalStatus: ApprovalStatus;

  @IsNumber()
  @ApiProperty({ description: 'Discount percentage for the customer', example: 10 })
  readonly discountPercentage: number;

  @ApiProperty({
    description: 'User specific permissions. For instance all customers can pay with credit card (creditcard-allowed)',
    example: [UserPermissions.CCALLOWED],
  })
  userPermissions: UserPermissions[];
}
