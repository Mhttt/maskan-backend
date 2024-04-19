import { IsArray, IsEmail, IsString, Matches, MinLength } from 'class-validator';
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
  @Matches(/^(?=.*\d)(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, start with a capital letter, and contain at least one number',
  })
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
