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
  ],
})
export class BackendModule {}
