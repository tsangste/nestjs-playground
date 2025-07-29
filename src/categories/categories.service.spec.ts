import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'

import { EntityManager, MikroORM } from '@mikro-orm/core'
import { defineConfig } from '@mikro-orm/postgresql'

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
          useValue: MikroORM.initSync({
            ...defineConfig({
              host: 'localhost',
              port: 5432,
              dbName: 'app',
              user: 'postgres',
              password: 'postgres',
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
