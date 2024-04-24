import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateVariantDto } from './update-variant.dto';

export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: 'Product name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'Product description' })
  readonly description: string;

  @IsNumber()
  @ApiProperty({ example: 225 })
  readonly price: number;

  @IsNumber()
  @ApiProperty({ example: 10 })
  readonly stock: number;

  @IsString()
  @Length(8, 8)
  @ApiProperty({ example: '12345678' })
  readonly sku: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateVariantDto)
  @ApiProperty({ required: false })
  readonly variant?: UpdateVariantDto;

  @IsArray()
  @ApiProperty({ example: ['imagelink1.com', 'imagelink2.com'] })
  readonly images: string[];

  @IsArray()
  @ApiProperty({ example: ['category1', 'category2'] })
  readonly category: string[];

  @IsArray()
  @ApiProperty({ example: ['industry1', 'industry2'] })
  readonly industry: string[];
}
