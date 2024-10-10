import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'

import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { EntityManager, MikroORM } from '@mikro-orm/core'
import { defineConfig } from '@mikro-orm/mongodb'
import { Category } from './entities/category.entity'

describe('CategoriesController', () => {
  let controller: CategoriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        Logger,
        CategoriesService,
        {
          provide: EntityManager,
          useValue: MikroORM.init({
            ...defineConfig({
              clientUrl: 'test',
              entities: [Category],
              connect: false,
            }),
          }),
        },
      ],
    }).compile()

    controller = module.get<CategoriesController>(CategoriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
