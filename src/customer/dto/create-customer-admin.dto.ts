import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsNumber, IsString, Length, MinLength, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/schemas/user.schema';

export class CreateCustomerAsAdminDto {
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
    example: 'John@gmail.com',
    required: true,
  })
  readonly email: string;

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

  @IsBoolean()
  @ApiProperty()
  readonly invoiceAllowed: boolean;

  @IsNumber()
  @ApiProperty()
  readonly discountPercentage?: number;

  @IsArray()
  @ApiProperty({
    example: ['user'],
    required: true,
  })
  readonly roles: Role[];
}
