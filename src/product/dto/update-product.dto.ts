import { ApiProperty } from '@nestjs/swagger';
import { VariantDto } from './variant.dto';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @ApiProperty({ example: 'Product name', required: false })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'Product description', required: false })
  readonly description: string;

  @IsNumber()
  @ApiProperty({ example: 225, required: false })
  readonly price: number;

  @IsNumber()
  @ApiProperty({ example: 10, required: false })
  readonly stock: number;

  @IsString()
  @ApiProperty({ example: '12345678', required: false })
  readonly sku: string;

  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @ApiProperty({ required: false })
  readonly variant?: VariantDto;

  @IsArray()
  @ApiProperty({ example: ['imagelink1.com', 'imagelink2.com'], required: false })
  readonly images: string[];

  @IsArray()
  @ApiProperty({ example: ['category1', 'category2'], required: false })
  readonly category: string[];

  @IsArray()
  @ApiProperty({ example: ['industry1', 'industry2'], required: false })
  readonly industry: string[];
}
