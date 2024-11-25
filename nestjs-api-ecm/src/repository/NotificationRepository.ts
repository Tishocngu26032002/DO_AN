import {DataSource, EntityRepository, Repository} from "typeorm";
import {OrderEntity} from "src/entities/order_entity/oder.entity";
import {Notification} from "src/entities/notification_entity/Notification";

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

}