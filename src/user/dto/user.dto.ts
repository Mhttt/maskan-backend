import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString, Length, MinLength, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { InvoiceDto } from 'src/invoice/dto/invoice.dto';
import { OrderDto } from 'src/order/dto/order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/user/schemas/user.schema';
import { UserConfigsDto } from './userConfig.dto';

export class CustomerDto {
  @IsString()
  @ApiProperty()
  readonly _id: string;

  @IsString()
  @MinLength(2)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly company: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @Length(8, 8)
  @ApiProperty()
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
