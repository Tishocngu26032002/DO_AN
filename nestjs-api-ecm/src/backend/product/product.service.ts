import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager} from "typeorm";
import {ProductEntity} from "src/entities/product_entity/product.entity";
import {productCreateDTO} from "src/dto/productDTO/product.create.dto";
import {productUpdateDTO} from "src/dto/productDTO/product.update.dto";
import {ProductRepository} from "src/repository/ProductRepository";
import {BaseService} from "src/base/baseService/base.service";
import {ExpirationStatus} from "src/share/Enum/Enum";

@Injectable()
export class ProductService extends BaseService<ProductEntity>{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepo: ProductRepository,
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

        if (filters.hot) condition.hot = filters.hot;
        if (filters.status && Object.values(ExpirationStatus).includes(filters.status)) {
            condition.status = filters.status;
        }

        const [list, total] = await this.productsRepo.findAndCount({
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

    async create(createProductDto: productCreateDTO) {
        if (
            createProductDto.status !== ExpirationStatus.Valid &&
            createProductDto.status !== ExpirationStatus.Expired &&
            createProductDto.status !== ExpirationStatus.ExpiringSoon
        ) {
            throw new Error('Invalid status value');
        }
        return await super.create(createProductDto, { name: createProductDto.name });
    }

    async detail(id: number) {
        return await super.findOne(id);
    }

    async update(productUpdateDTO: productUpdateDTO, id: number) {
        return super.update(productUpdateDTO, id);
    }

    async delete(id: number) {
        return super.delete(id);
    }
}
