import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class AddressDto {
  @IsString()
  @ApiProperty({
    example: 'Langelinie Park 1',
  })
  readonly address: string;

  @IsString()
  @ApiProperty({
    example: 'København K',
  })
  readonly city: string;

  @IsString()
  @Length(4, 4)
  @ApiProperty({
    example: '1259',
  })
  readonly zip: string;

  @IsString()
  @ApiProperty({
    example: 'Danmark',
  })
  readonly country: string;
}
