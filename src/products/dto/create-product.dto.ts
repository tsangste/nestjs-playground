import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  colour: string;

  @IsNumber()
  @ApiProperty()
  stock: number;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsMongoId()
  @ApiProperty()
  category_id: string;
}
