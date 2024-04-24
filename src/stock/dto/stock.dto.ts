import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StockDto {
  @IsString()
  @ApiProperty({ example: '662901a9ef7e490d48ba2012', description: 'Unique mongoose ID of the product' })
  readonly productId: string;

  @IsString()
  @ApiProperty({ example: 'My product', description: 'Name of the product' })
  readonly productName: string;

  @IsString()
  @ApiProperty({ example: '12345678', description: 'Unique 8 digit SKU number for the product' })
  readonly sku: string;

  @IsNumber()
  @ApiProperty({ example: 10, description: 'Amount of stock available' })
  readonly stock: number;
}
