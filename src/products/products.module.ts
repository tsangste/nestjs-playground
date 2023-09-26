import { Logger, Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs'

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity'

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Product, Category],
    }),
  ],
  controllers: [ProductsController],
  providers: [Logger, ProductsService],
})
export class ProductsModule {}
