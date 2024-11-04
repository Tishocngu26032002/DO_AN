import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order_entity/oder.entity';
import { Order_productEntity } from 'src/entities/order_entity/order_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, Order_productEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
