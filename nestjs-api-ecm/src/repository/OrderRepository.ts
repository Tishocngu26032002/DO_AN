import {EntityRepository, Repository} from "typeorm";
import {OrderEntity} from "src/entities/order_entity/oder.entity";

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {

}