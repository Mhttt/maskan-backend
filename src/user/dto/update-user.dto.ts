import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString, Length, MinLength, ValidateNested } from 'class-validator';
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

  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  @ApiProperty({ type: () => OrderDto })
  readonly orders: OrderDto[];

  @ValidateNested({ each: true })
  @Type(() => InvoiceDto)
  @ApiProperty({ type: () => InvoiceDto })
  readonly invoices: InvoiceDto[];

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
