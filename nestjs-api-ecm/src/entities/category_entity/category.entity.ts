import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from 'src/entities/product_entity/product.entity';
import { BaseEntity } from 'src/base/baseEntity/base.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  image: string;

  @Column()
  c_banner: string;

  @Column()
  c_description: string;

  @Column()
  c_hot: number;

  @Column()
  c_status: boolean;
}
