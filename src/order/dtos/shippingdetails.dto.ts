import { IsDate, IsString } from 'class-validator';
import { AddressDto } from 'src/customer/dtos/address.dto';

export class ShippingDetailsDto {
  @IsString()
  readonly deliveryAddress: string;

  @IsDate()
  readonly shipDate: Date;

  @IsString()
  readonly carrier: string;

  @IsString()
  readonly trackingNumber: string;

  readonly shippingAddress: AddressDto;
}
