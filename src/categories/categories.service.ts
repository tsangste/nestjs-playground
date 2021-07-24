import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';

import { Category, CategoryDocument } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCat = new this.categoryModel(createCategoryDto);
    return createdCat.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: new ObjectID(id) }).exec();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryModel
      .updateOne({ _id: new ObjectID(id) }, updateCategoryDto)
      .exec();

    return this.categoryModel.findOne({ _id: new ObjectID(id) }).exec();
  }

  async remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(new ObjectID(id)).exec();
  }
}
