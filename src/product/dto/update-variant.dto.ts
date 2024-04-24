import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateVariantDto {
  @IsString()
  @ApiProperty({ example: 'My Variant', required: false })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'Variant description', required: false })
  readonly description: string;

  @IsArray()
  @ApiProperty({ example: ['variantimage1.com', 'variantimage2.com'], required: false })
  readonly images: string[];
}
