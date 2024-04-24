import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsLowercase, IsString, Length, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/schemas/user.schema';
import { AddressDto } from './address.dto';
import { OrderDto } from 'src/order/dto/order.dto';
import { InvoiceDto } from 'src/invoice/dto/invoice.dto';
import { UserConfigsDto } from './userConfig.dto';

export class UpdateCustomerDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    example: 'MyCompany',
    required: false,
  })
  readonly company: string;

  @IsEmail()
  @IsLowercase()
  @ApiProperty({
    example: 'john@gmail.com',
    required: false,
  })
  readonly email: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty({
    example: '12345678',
    required: false,
  })
  readonly cvr: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty({ required: false })
  readonly invoiceAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty({ required: false })
  readonly shippingAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  @ApiProperty({ required: false })
  readonly orders: OrderDto[];

  @ValidateNested({ each: true })
  @Type(() => InvoiceDto)
  @ApiProperty({ required: false })
  readonly invoices: InvoiceDto[];

  @ValidateNested({ each: true })
  @Type(() => UserConfigsDto)
  @ApiProperty({ required: false })
  readonly userConfigs: UserConfigsDto;

  @IsArray()
  @ApiProperty({
    example: ['customer'],
    required: false,
  })
  readonly roles: Role[];
}
