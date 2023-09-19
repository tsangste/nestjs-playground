import { Logger, Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs'

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Category],
    }),
  ],
  controllers: [CategoriesController],
  providers: [Logger, CategoriesService],
})
export class CategoriesModule {}
