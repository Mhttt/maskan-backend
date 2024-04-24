import { ApiProperty } from '@nestjs/swagger';
import { VariantDto } from './variant.dto';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @ApiProperty({ required: false })
  readonly name: string;

  @IsString()
  @ApiProperty({ required: false })
  readonly description: string;

  @IsNumber()
  @ApiProperty({ required: false })
  readonly price: number;

  @IsNumber()
  @ApiProperty({ required: false })
  readonly stock: number;

  @IsString()
  @ApiProperty({ required: false })
  readonly sku: string;

  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  @ApiProperty({ required: false })
  readonly variant: VariantDto;

  @IsArray()
  @ApiProperty({ required: false })
  readonly images: string[];

  @IsArray()
  @ApiProperty({ required: false })
  readonly category: string[];

  @IsArray()
  @ApiProperty({ required: false })
  readonly industry: string[];
}
