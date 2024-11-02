import { BaseEntity } from 'src/base/baseEntity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/entities/user_entity/user.entity';
import { Order_Product } from 'src/entities/order_entity/order_product.entity';
@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ type: 'int' })
  total_price: number;
  @Column({ type: 'tinyint' })
  status: number;
  @Column({ type: 'tinyint' })
  payment_method: number;
  @Column({ type: 'varchar', length: 36 })
  employee_id: string;
  @Column({ type: 'varchar', length: 36 })
  user_id: string;

  // user_id: ID of the person who placed the order
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' }) // Foreign key for the user who placed the order
  user: User;

  // employee_id: ID of the employee who delivers the order
  @ManyToOne(() => User, (user) => user.deliveries)
  @JoinColumn({ name: 'employee_id' }) // Foreign key for the employee who delivers the order
  employee: User;

  // Relation with Order_Product
  @OneToMany(() => Order_Product, (orderProduct) => orderProduct.order)
  orderProducts: Order_Product[];
}