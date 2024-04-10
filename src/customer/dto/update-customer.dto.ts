import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly company: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly email: string;

  @IsString()
  @Length(8, 8)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly cvr: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly invoiceAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly shippingAddress?: AddressDto;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly invoiceAllowed: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly discountPercentage?: number;
}
