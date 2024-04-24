import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/user/dto/address.dto';
import * as dayjs from 'dayjs';

export class ShippingDetailsDto {
  @IsString()
  @ApiProperty()
  readonly deliveryAddress: string;

  @IsString()
  @ApiProperty({ example: dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ[Z]') })
  readonly shipDate: string;

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
