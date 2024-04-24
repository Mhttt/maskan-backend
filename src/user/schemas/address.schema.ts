import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class Address {
  @ApiProperty({ description: 'Address of the user' })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ description: 'City of the user' })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ description: 'Zip code of the user' })
  @Prop({ required: true, minLength: 4, maxLength: 4 })
  zip: string;

  @ApiProperty({ description: 'Country code of the user' })
  @Prop({ required: true })
  country: string;
}
