import { ApiProperty, OmitType } from '@nestjs/swagger';

import { CreateProductDto } from './create-product.dto';
import { Product } from '../entities/product.entity';
import { ViewCategoryDto } from '../../categories/dto/view-category.dto';

export class ViewProductDto extends OmitType(CreateProductDto, [
  'category_id',
]) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category: ViewCategoryDto;

  static fromEntity(product: Product) {
    const dto = new ViewProductDto();
    dto.id = (product as any).id;
    dto.name = product.name;
    dto.description = product.description;
    dto.colour = product.colour;
    dto.stock = product.stock;
    dto.price = product.price;
    dto.category = ViewCategoryDto.fromEntity(product.category);

    return dto;
  }
}
