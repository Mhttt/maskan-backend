import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class SuccessDto {
  @ApiProperty({ default: 'Request was successfully processed!' })
  message: string;
  @ApiProperty({ enum: HttpStatus, default: HttpStatus.OK })
  status_code: HttpStatus;
}
