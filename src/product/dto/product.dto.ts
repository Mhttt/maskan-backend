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

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @ApiProperty()
  readonly stock: number;

  @IsString()
  @ApiProperty()
  readonly sku: string;

  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @ApiProperty()
  readonly variant: VariantDto;

  @IsArray()
  @ApiProperty()
  readonly images: string[];

  @IsArray()
  @ApiProperty()
  readonly category: string[];

  @IsArray()
  @ApiProperty()
  readonly industry: string[];
}
