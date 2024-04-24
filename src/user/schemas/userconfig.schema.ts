import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum ApprovalStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export enum UserPermissions {
  INVOICEALLOWED = 'invoice-allowed',
  CCALLOWED = 'creditcard-allowed',
}

@Schema({ _id: false })
export class UserConfigs {
  @ApiProperty({ description: 'Approval status of the user. Can be approved, pending or rejected' })
  @Prop({ required: true, default: ApprovalStatus.APPROVED })
  approvalStatus: ApprovalStatus;

  @ApiProperty({ description: 'Discount percentage for the user' })
  @Prop({ required: true, default: 0 })
  discountPercentage: number;

  @ApiProperty({
    description: 'User specific permissions. For instance all customers can pay with credit card (creditcard-allowed)',
  })
  @Prop({ required: true, default: [UserPermissions.CCALLOWED] })
  userPermissions: UserPermissions[];
}
