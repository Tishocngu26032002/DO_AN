import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from '../../dto/supplierDTO/create-supplier.dto';
import { UpdateSupplierDto } from '../../dto/supplierDTO/update-supplier.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "src/entities/product_entity/product.entity";
import {EntityManager, Repository} from "typeorm";
import {SupplierEntity} from "src/entities/supplier_entity/supplier.entity";
import {BaseService} from "src/base/baseService/base.service";
import {SupplierRepository} from "src/repository/SupplierRepository";

@Injectable()
export class SupplierService extends BaseService<SupplierEntity>{
  constructor(
      @InjectRepository(SupplierEntity)
      private readonly supplierRepo: SupplierRepository,
      private readonly entityManager: EntityManager,
  ) {
    super(supplierRepo);
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

    const [list, total] = await this.supplierRepo.findAndCount({
      where: condition,
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!list) throw new Error('NO PRODUCT!');

    return {
      data: list,
      total,
      page,
      limit,
    };
  }
  async create(createSupplierDto: CreateSupplierDto) {
    return await this.supplierRepo.save(createSupplierDto);
  }

  async detail(id: number) {
    return await super.findOne(id);
  }

  async update(updateSupplierDto: UpdateSupplierDto, id: number): Promise<SupplierEntity> {
    return super.update(updateSupplierDto, id);
  }

  async delete(id: number) {
    return super.delete(id);
  }
}
