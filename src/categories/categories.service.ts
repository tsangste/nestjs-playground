import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';

import { Category, CategoryDocument } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ViewCategoryDto } from './dto/view-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    this.logger.debug({
      message: 'save category',
      category: createCategoryDto,
    });

    const createdCat = new this.categoryModel(createCategoryDto);
    return createdCat.save();
  }

  async findAll(): Promise<ViewCategoryDto[]> {
    this.logger.debug('Find All Categories');

    return (await this.categoryModel.find().exec()).map(c =>
      ViewCategoryDto.fromEntity(c),
    );
  }

  async findOne(id: string): Promise<ViewCategoryDto> {
    this.logger.debug({
      message: 'Find Category',
      id: id,
    });

    const entity = await this.categoryModel
      .findOne({ _id: new ObjectID(id) })
      .exec();

    if (entity) {
      return ViewCategoryDto.fromEntity(entity);
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    this.logger.debug({
      message: 'Update Category',
      id: id,
      category: updateCategoryDto,
    });

    await this.categoryModel
      .updateOne({ _id: new ObjectID(id) }, updateCategoryDto)
      .exec();

    return this.categoryModel.findOne({ _id: new ObjectID(id) }).exec();
  }

  async remove(id: string): Promise<Category> {
    this.logger.debug({
      message: 'Delete Category',
      id: id,
    });

    return this.categoryModel.findByIdAndDelete(new ObjectID(id)).exec();
  }
}
