import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/schemas/user.schema';
import { AddressDto } from './address.dto';
import { OrderDto } from 'src/order/dto/order.dto';
import { InvoiceDto } from 'src/invoice/dto/invoice.dto';
import { UserConfigsDto } from './userConfig.dto';
import {
  IsArray,
  IsEmail,
  IsLowercase,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdateUserDto {
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
  @IsLowercase()
  @IsOptional()
  @ApiProperty({
    example: 'john@gmail.com',
    required: false,
  })
  readonly email: string;

  @IsString()
  @Length(8, 8)
  @IsOptional()
  @ApiProperty({
    example: '12345678',
    required: false,
  })
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
  readonly shippingAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly orders: OrderDto[];

  @ValidateNested({ each: true })
  @Type(() => InvoiceDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly invoices: InvoiceDto[];

  @ValidateNested({ each: true })
  @Type(() => UserConfigsDto)
  @IsOptional()
  @ApiProperty({ required: false })
  readonly userConfigs: UserConfigsDto;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['customer'],
    required: false,
  })
  readonly roles: Role[];
}
