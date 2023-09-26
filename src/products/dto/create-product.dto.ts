import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

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

  @ApiProperty()
  category_id: string;
}
