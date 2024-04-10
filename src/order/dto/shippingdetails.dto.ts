import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/customer/dto/address.dto';

export class ShippingDetailsDto {
  @IsString()
  @ApiProperty()
  readonly deliveryAddress: string;

  @IsDate()
  @ApiProperty()
  readonly shipDate: Date;

  @IsString()
  @ApiProperty()
  readonly carrier: string;

  @IsString()
  @ApiProperty()
  readonly trackingNumber: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ApiProperty()
  readonly shippingAddress: AddressDto;
}
