import { IsArray, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schemas/user.schema';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  @ApiProperty({
    example: 'John@gmail.com',
    required: true,
  })
  readonly email: string;

  @IsString()
  @ApiProperty()
  @ApiProperty({
    example: 'Mypassword123',
    required: true,
  })
  readonly password: string;

  @IsArray()
  @ApiProperty()
  @ApiProperty({
    example: ['user'],
  })
  readonly roles: Role[];
}
