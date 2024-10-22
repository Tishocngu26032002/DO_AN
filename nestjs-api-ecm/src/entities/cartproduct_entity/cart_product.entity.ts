import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/base/baseEntity/base.entity';
@Entity({ name: 'cart_product' })
export class Cart_productEntity extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'text' })
  product_id: string;

  @Column({ type: 'text' })
  user_id: string;
}
