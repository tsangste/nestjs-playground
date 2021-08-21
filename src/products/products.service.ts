import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';

import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ViewProductDto } from './dto/view-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  create(createProductDto: CreateProductDto) {
    this.logger.debug({
      message: 'save product',
      product: createProductDto,
    });

    const createProd = new this.productModel(createProductDto);
    return createProd.save();
  }

  async findAll() {
    this.logger.debug('Find All Products');

    return (await this.productModel.find().exec()).map(p =>
      ViewProductDto.fromEntity(p),
    );
  }

  async findOne(id: string) {
    this.logger.debug({
      message: 'Find Product',
      id: id,
    });

    const product = await this.productModel
      .findOne({ _id: new ObjectID(id) })
      .exec();

    if (product) {
      return ViewProductDto.fromEntity(product);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.debug({
      message: 'Update Product',
      id: id,
      product: updateProductDto,
    });

    await this.productModel
      .updateOne({ _id: new ObjectID(id) }, updateProductDto)
      .exec();

    return this.productModel.findOne({ _id: new ObjectID(id) }).exec();
  }

  remove(id: string) {
    this.logger.debug({
      message: 'Delete Category',
      id: id,
    });

    return this.productModel.findByIdAndDelete(new ObjectID(id)).exec();
  }
}
