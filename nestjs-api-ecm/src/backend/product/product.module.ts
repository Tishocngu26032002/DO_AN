import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {UserService} from "src/backend/user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "src/entities/user_entity/user.entity";
import {ProductEntity} from "src/entities/product_entity/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
