import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VariantDto {
  @IsString()
  @ApiProperty()
  readonly _id: string;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;
}
