import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/schemas/user.schema';
import { UpdateAddressDto } from './update-address.dto';

export class UpdateCustomerDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'MyCompany',
    required: false,
  })
  readonly company: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'UpdateJohn@gmail.com', required: false })
  readonly email: string;

  @IsString()
  @Length(8, 8)
  @IsOptional()
  @ApiProperty({ example: '12345678', required: false })
  readonly cvr: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly invoiceAddress: UpdateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly shippingAddress?: UpdateAddressDto;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly invoiceAllowed: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly discountPercentage?: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['user'],
    required: false,
  })
  readonly roles: Role[];
}
