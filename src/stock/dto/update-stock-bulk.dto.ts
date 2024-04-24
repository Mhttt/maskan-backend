import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateStockBulkDto {
  @IsString()
  @ApiProperty({ example: '662901a9ef7e490d48ba2012', description: 'Unique mongoose ID of the product' })
  readonly productId: string;

  @IsNumber()
  @ApiProperty({ example: 10, description: 'Amount of stock available' })
  readonly stock: number;
}
