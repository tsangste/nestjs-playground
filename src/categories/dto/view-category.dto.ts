import { ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './create-category.dto';
import { Category } from '../entities/category.entity';

export class ViewCategoryDto extends CreateCategoryDto {
  @ApiProperty()
  id: string;

  static fromEntity(category: Category) {
    const dto = new ViewCategoryDto();
    dto.id = (category as any).id;
    dto.name = category.name;
    dto.description = category.description;

    return dto;
  }
}
