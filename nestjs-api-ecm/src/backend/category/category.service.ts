import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category_entity/category.entity';
import { Repository } from 'typeorm';
import { categoryCreateDTO } from '../../dto/categoryDTO/category.create.dto';
import * as slug from 'slug';
import { categoryUpdateDTO } from '../../dto/categoryDTO/category.update.dto';
import { baseService } from '../../base/baseService/base.service';

@Injectable()
export class CategoryService extends baseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {
    super(categoryRepo);
  }

  async getList(page: number = 1, limit: number = 10, filters: any) {
    if (page < 1) {
      throw new Error('PAGE NUMBER MUST BE GREATER THAN 0!');
    }

    if (limit < 1) {
      throw new Error('LIMIT MUST BE GREATER THAN 0!');
    }

    const condition: any = {};

    if (filters.hot) condition.hot = filters.hot;
    if (filters.status) condition.status = filters.status;

    const [list, total] = await this.categoryRepo.findAndCount({
      where: condition,
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!list) throw new Error('NO CATEGORY!');

    return {
      data: list,
      total,
      page,
      limit,
    };
  }

  async create(createCate: categoryCreateDTO) {
    createCate.slug = slug(createCate.name);
    return await super.create(createCate, { name: createCate.name });
  }

  async detail(id: number) {
    return await super.findOne(id);
  }

  async update(categoryUpdateDTO: categoryUpdateDTO, id: number) {
    return super.update(categoryUpdateDTO, id);
  }

  async delete(id: number) {
    return super.delete(id);
  }
}
