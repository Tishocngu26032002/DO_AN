import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "src/entities/order_entity/oder.entity";
import {Order_productEntity} from "src/entities/order_entity/order_product.entity";
import {OrderRepository} from "src/repository/OrderRepository";
import {OrderProductRepository} from "src/repository/OrderProductRepository";
import {ImportRepository} from "src/repository/ImportRepository";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, Order_productEntity, OrderRepository, OrderProductRepository]),
  ],
  exports: [DashboardService],
  controllers: [DashboardController],
  providers: [DashboardService,
    OrderRepository,
    OrderProductRepository,
    ImportRepository
  ],
})
export class DashboardModule {}