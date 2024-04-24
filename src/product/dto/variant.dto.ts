import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class VariantDto {
  @IsString()
  @ApiProperty({ example: '662901a9ef7e490d48ba2012', description: 'Unique mongoose ID of the variant' })
  readonly _id: string;

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
