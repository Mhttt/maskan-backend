import { ApiProperty } from '@nestjs/swagger';
import { VariantDto } from './variant.dto';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @IsString()
  @ApiProperty()
  readonly _id: string;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsArray()
  @ApiProperty()
  readonly images: string[];

  @IsNumber()
  @ApiProperty()
  readonly stock: number;

  @IsNumber()
  @ApiProperty()
  readonly sku: number;

  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @ApiProperty()
  readonly variant: VariantDto;

  @IsArray()
  @ApiProperty()
  readonly category: string[];

  @IsArray()
  @ApiProperty()
  readonly industry: string[];
}
