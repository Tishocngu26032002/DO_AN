import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order_entity/oder.entity';
import { Order_productEntity } from 'src/entities/order_entity/order_product.entity';
import {UserRepository} from "src/repository/UserRepository";
import {User} from "src/entities/user_entity/user.entity";
import {NotificationService} from "src/backend/notification/notification.service";
import {NotificationRepository} from "src/repository/NotificationRepository";
import {Notification} from "src/entities/notification_entity/Notification";
import {EmailService} from "src/backend/email/email.service";
import {WebsocketGateway} from "src/share/WebsocketGateway";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, Notification, User, Order_productEntity])],
  controllers: [OrderController],
  providers: [OrderService, NotificationService,
    UserRepository, NotificationRepository, EmailService,
    WebsocketGateway, NotificationService],
})
export class OrderModule {}
