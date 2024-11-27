import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order_entity/oder.entity';
import { Order_productEntity } from 'src/entities/order_entity/order_product.entity';
import {UserRepository} from "src/repository/UserRepository";
import {User} from "src/entities/user_entity/user.entity";
import {NotificationService} from "src/backend/notification/notification.service";
import {EmailService} from "src/backend/email/email.service";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, User, Order_productEntity])],
  controllers: [OrderController],
  providers: [OrderService, NotificationService,
    UserRepository, EmailService,
    NotificationService],
})
export class OrderModule {}
