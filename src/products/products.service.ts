import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

import { EntityManager, wrap } from '@mikro-orm/core'

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly em: EntityManager,
  ) {}

  async create(createProductDto: CreateProductDto) {
    this.logger.debug({
      message: 'save product',
      product: createProductDto,
    });

    const createdProd = this.em.create(Product, createProductDto);
    await this.em.flush();

    return wrap(createdProd).toObject()
  }

  async findAll() {
    this.logger.debug('Find All Products');

    return (await this.em.find(Product, {})).map(c => wrap(c).toObject());
  }

  async findOne(id: string) {
    this.logger.debug({
      message: 'Find Product',
      id: id,
    });

    const entity = await this.em
      .findOne(Product, { id });

    if (entity) {
      return wrap(entity).toObject();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.debug({
      message: 'Update Product',
      id: id,
      product: updateProductDto,
    });

    const product = await this.findOne(id)
    this.em.assign(Product, updateProductDto as any)
    await this.em.flush()

    return product;
  }

  async remove(id: string) {
    this.logger.debug({
      message: 'Delete Category',
      id: id,
    });

    const product = await this.findOne(id)
    return this.em.removeAndFlush(product);
  }
}
