import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/base/baseEntity/base.entity';
import { CategoryEntity } from 'src/entities/category_entity/category.entity';
import { JoinColumn } from 'typeorm';
import { SupplierEntity } from 'src/entities/supplier_entity/supplier.entity';
import { Cart_productEntity } from 'src/entities/cartproduct_entity/cart_product.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  priceout: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  stockQuantity: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'text' })
  url_images: string;
}
