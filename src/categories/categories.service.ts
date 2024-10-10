import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common'

import { EntityManager } from '@mikro-orm/core'

import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly em: EntityManager
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    this.logger.debug({
      message: 'save category',
      category: createCategoryDto,
    })

    const createdCat = this.em.create(Category, createCategoryDto)
    await this.em.flush()

    return createdCat
  }

  async findAll(): Promise<Category[]> {
    this.logger.debug('Find All Categories')

    return this.em.find(Category, {})
  }

  async findOne(id: string): Promise<Category> {
    this.logger.debug({
      message: 'Find Category',
      id: id,
    })

    return this.em.findOne(Category, { id })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    this.logger.debug({
      message: 'Update Category',
      id: id,
      category: updateCategoryDto,
    })

    const category = await this.findOne(id)
    this.em.assign(category, updateCategoryDto)
    await this.em.flush()

    return category
  }

  async remove(id: string): Promise<void> {
    this.logger.debug({
      message: 'Delete Category',
      id: id,
    })

    const category = await this.findOne(id)
    return this.em.removeAndFlush(category)
  }
}
