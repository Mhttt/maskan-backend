import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Langelinie Park 1',
    required: false,
  })
  readonly address: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'København K',
    required: false,
  })
  readonly city: string;

  @IsString()
  @IsOptional()
  @Length(4, 4)
  @ApiProperty({
    example: '1259',
    required: false,
  })
  readonly zip: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Danmark',
    required: false,
  })
  readonly country: string;
}
