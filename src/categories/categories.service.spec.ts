import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'

import { EntityManager, MikroORM } from '@mikro-orm/core'
import { defineConfig } from '@mikro-orm/mongodb'

import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'

describe('CategoriesService', () => {
  let service: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CategoriesService>(CategoriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
