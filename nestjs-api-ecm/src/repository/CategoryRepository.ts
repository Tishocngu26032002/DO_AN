import {EntityRepository, Repository} from "typeorm";
import {SupplierEntity} from "src/entities/supplier_entity/supplier.entity";

@EntityRepository(SupplierEntity)
export class SupplierRepository extends Repository<SupplierEntity> {

}