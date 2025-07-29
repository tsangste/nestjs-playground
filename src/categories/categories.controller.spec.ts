import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'

import { EntityManager, MikroORM } from '@mikro-orm/core'
import { defineConfig } from '@mikro-orm/postgresql'

import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
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
          useValue: MikroORM.initSync({
            ...defineConfig({
              host: 'localhost',
              port: 5432,
              dbName: 'nest',
              user: 'postgres',
              password: 'postgres',
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
