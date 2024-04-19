import { Type } from 'class-transformer';
import { IsEmail, IsString, Length, Matches, MinLength, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerAsUserDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    example: 'John Doe',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    example: 'MyCompany',
  })
  readonly company: string;

  @IsEmail()
  @ApiProperty({
    example: 'John@gmail.com',
  })
  readonly email: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '12345678',
  })
  readonly cvr: string;

  @ApiProperty({ description: 'Password of the user', example: 'Mypassword123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, start with a capital letter, and contain at least one number',
  })
  readonly password: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty()
  readonly invoiceAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty()
  readonly shippingAddress: AddressDto;
}
