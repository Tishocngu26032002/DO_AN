import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/base/baseEntity/base.entity';
import { ProductEntity } from 'src/entities/product_entity/product.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  image: string;

  @Column()
  banner: string;

  @Column()
  description: string;

  @Column()
  hot: number;

  @Column()
  status: boolean;

  // Mối quan hệ với ProductEntity
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[]; // Danh sách sản phẩm thuộc về danh mục
}
