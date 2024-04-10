import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class ErrorDto {
  @ApiProperty({ default: 'An error has occured' })
  message: string;
  @ApiProperty({ default: 'Internal Server Error' })
  error: string;
  @ApiProperty({ enum: HttpStatus, default: HttpStatus.INTERNAL_SERVER_ERROR })
  status_code: HttpStatus;
}
