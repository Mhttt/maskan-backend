import { IsArray, IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/schemas/user.schema';

export class UserAuthDto {
  @IsString()
  @ApiProperty()
  readonly _id: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @ApiProperty({ description: 'Password of the user', example: 'Mypassword123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, start with a capital letter, and contain at least one number',
  })
  readonly password: string;

  @IsArray()
  @ApiProperty({
    example: ['user'],
    required: true,
  })
  readonly roles: Role[];
}
