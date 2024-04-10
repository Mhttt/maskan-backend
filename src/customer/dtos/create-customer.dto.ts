import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateCustomerDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsString()
  readonly company: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 8)
  readonly cvr: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly invoiceAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly shippingAddress?: AddressDto;

  @IsBoolean()
  readonly invoiceAllowed: boolean;

  @IsNumber()
  readonly discountPercentage?: number;
}
