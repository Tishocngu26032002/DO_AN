import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { LoginModuleModule } from './auth/login-module/login-module.module';
import { RegisterModuleModule } from './auth/register-module/register-module.module';
import { CloudinaryModule } from 'src/backend/cloudinary/cloudinary.module';
import {SupplierModule} from "src/backend/supplier/supplier.module";

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    ArticleModule,
    MenuModule,
    TransactionModule,
    OrderModule,
    UserModule,
    LoginModuleModule,
    RegisterModuleModule,
    CloudinaryModule,
    SupplierModule
  ],
})
export class BackendModule {}
