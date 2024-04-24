import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString, Length, Matches, MinLength, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserConfigsDto } from './userConfig.dto';
import { Role } from '../schemas/user.schema';

export class CreateUserAsAdminDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    example: 'MyCompany',
    required: true,
  })
  readonly company: string;

  @IsEmail()
  @ApiProperty({
    example: 'john@gmail.com',
    required: true,
  })
  readonly email: string;

  @ApiProperty({ description: 'Password of the user', example: 'Mypassword123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, start with a capital letter, and contain at least one number',
  })
  readonly password: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '12345678',
  })
  readonly cvr: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty()
  readonly invoiceAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty()
  readonly shippingAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => UserConfigsDto)
  @ApiProperty()
  readonly userConfigs: UserConfigsDto;

  @IsArray()
  @ApiProperty({
    example: ['customer'],
    required: true,
  })
  readonly roles: Role[];
}
