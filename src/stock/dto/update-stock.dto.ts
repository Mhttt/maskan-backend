import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateStockDto {
  @IsNumber()
  @ApiProperty({ example: 10, description: 'Amount of stock available' })
  readonly stock: number;
}
