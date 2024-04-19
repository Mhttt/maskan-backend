import { IsArray, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schemas/user.schema';

export class UserDto {
  @ApiProperty({
    example: '6620e69a8949d57655546d9b',
    required: true,
  })
  readonly _id: string;

  @IsEmail()
  @ApiProperty({
    example: 'John@gmail.com',
    required: true,
  })
  readonly email: string;

  @IsString()
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
