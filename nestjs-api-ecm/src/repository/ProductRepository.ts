import {EntityRepository, Repository} from "typeorm";
import {ProductEntity} from "src/entities/product_entity/product.entity";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {

}