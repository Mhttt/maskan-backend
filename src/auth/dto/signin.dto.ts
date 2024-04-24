import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty({
    example: 'john@gmail.com',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'Mypassword123',
  })
  readonly password: string;
}
