import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateVariantDto {
  @IsString()
  @ApiProperty({ required: false })
  readonly name: string;

  @IsString()
  @ApiProperty({ required: false })
  readonly description: string;

  @IsArray()
  @ApiProperty({ required: false })
  readonly images: string[];
}
