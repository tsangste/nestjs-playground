import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CategoriesService } from './categories.service';
import { CategoryDocument } from './entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let model: Model<CategoryDocument>;

  const spyFind = jest.fn();
  const spyFindOne = jest.fn();
  const spyUpdateOne = jest.fn();
  const spyRemove = jest.fn();
  const mockModel = {
    find: () => ({ exec: spyFind.mockResolvedValue([]) }),
    findOne: () => ({ exec: spyFindOne.mockResolvedValue({}) }),
    updateOne: () => ({ exec: spyUpdateOne.mockResolvedValue({}) }),
    findByIdAndDelete: () => ({ exec: spyRemove.mockResolvedValue({}) }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getModelToken('Category'), useValue: mockModel },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    model = module.get(getModelToken('Category'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    await service.findAll();

    expect(model.find().exec).toHaveBeenCalled();
  });

  it('findOne', async () => {
    await service.findOne('60fc19fc6e92660020ea8653');

    expect(model.findOne().exec).toHaveBeenCalled();
  });

  it('update', async () => {
    await service.update('60fc19fc6e92660020ea8653', { description: 'test' });

    expect(model.updateOne().exec).toHaveBeenCalled();
    expect(model.findOne().exec).toHaveBeenCalled();
  });

  it('delete', async () => {
    await service.remove('60fc19fc6e92660020ea8653');

    expect(model.findByIdAndDelete().exec).toHaveBeenCalled();
  });
});
