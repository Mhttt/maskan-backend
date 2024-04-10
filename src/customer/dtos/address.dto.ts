import { IsNumber, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  readonly street: string;

  @IsString()
  readonly city: string;

  @IsNumber()
  readonly zip: number;

  @IsString()
  readonly country: string;
}
