import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schemas/user.schema';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'John@gmail.com',
    required: true,
  })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'Mypassword123',
    required: true,
  })
  readonly password: string;

  @IsArray()
  @ApiProperty({
    example: ['user'],
  })
  readonly roles: Role[];
}
