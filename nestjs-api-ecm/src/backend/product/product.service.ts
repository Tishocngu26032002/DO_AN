import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager, In, Like} from "typeorm";
import {ProductEntity} from "src/entities/product_entity/product.entity";
import {ProductRepository} from "src/repository/ProductRepository";
import {BaseService} from "src/base/baseService/base.service";
import {ExpirationStatus} from "src/share/Enum/Enum";
import {ProductUpdateDTO} from "src/dto/productDTO/product.update.dto";
import {ProductCreateDTO} from "src/dto/productDTO/product.create.dto";
import {ImportRepository} from "src/repository/ImportRepository";
import {ImportProductRepository} from "src/repository/ImportProductRepository";
import {Import_productEntity} from "src/entities/import_entity/import_product.entity";

@Injectable()
export class ProductService extends BaseService<ProductEntity>{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepo: ProductRepository,
        @InjectRepository(Import_productEntity)
        private readonly importProductRepo: ImportProductRepository,
        private readonly entityManager: EntityManager,
    ) {
        super(productsRepo);
    }

    async getList(page: number = 1, limit: number = 10, filters: any) {
        if (page < 1) {
            throw new Error('PAGE NUMBER MUST BE GREATER THAN 0!');
        }

        if (limit < 1) {
            throw new Error('LIMIT MUST BE GREATER THAN 0!');
        }

        const condition: any = {};

        if (filters.status && Object.values(ExpirationStatus).includes(filters.status)) {
            condition.status = filters.status;
        }

        const [list, total] = await this.productsRepo.findAndCount({
            where: condition,
            skip: (page - 1) * limit,
            take: limit,
            relations: ['category'],
        });

        if (!list) throw new Error('NO PRODUCT!');

        return {
            products: list,
            total,
            page,
            limit,
        };
    }

    async searchProducts(page: number, limit: number, filters: any): Promise<{ products: ProductEntity[]; total: number }> {
        const whereConditions: any = {};
        if (filters.name) {
            whereConditions.name = Like(`%${filters.name}%`);
        }
        if (filters.category_id) {
            whereConditions.category_id = Array.isArray(filters.category_id)
                ? In(filters.category_id)
                : filters.category_id;
        }
        const [result, total] = await this.productsRepo.findAndCount({
            where: whereConditions,
            take: limit,
            skip: (page - 1) * limit,
            relations: ['category']
        });

        return {
            products: result,
            total,
        };
    }

    async create(createProductDto: ProductCreateDTO) {
        return await super.create(createProductDto, { name: createProductDto.name });
    }

    async detail(id: string) {
        return await super.findOne(id);
    }

    async update(productUpdateDTO: ProductUpdateDTO, id: string) {
        return await super.update(productUpdateDTO, id);
    }

    async delete(id: string) {
        return await super.delete(id);
    }
}
