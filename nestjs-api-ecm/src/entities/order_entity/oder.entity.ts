import { BaseEntity } from 'src/base/baseEntity/base.entity';
import { Column, Entity } from 'typeorm';
@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ type: 'int' })
  total_price: number;
  @Column({ type: 'tinyint' })
  status: number;
  @Column({ type: 'tinyint' })
  payment_method: number;
  @Column({ type: 'text' })
  employee_id: string;
  @Column({ type: 'text' })
  user_id: string;
}
