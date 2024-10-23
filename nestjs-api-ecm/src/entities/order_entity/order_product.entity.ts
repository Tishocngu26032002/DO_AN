import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/entities/order_entity/oder.entity';
import {ProductEntity} from "src/entities/product_entity/product.entity";
@Entity({ name: 'oder_product' })
export class Order_Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  priceout: number;

  @Column({ type: 'text' })
  order_id: string;

  @Column({ type: 'text' })
  product_id: string;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' }) // Foreign key for the order
  order: Order;

  // Many-to-One relation with Product
  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  @JoinColumn({ name: 'product_id' }) // Foreign key for the product
  product: ProductEntity;
}
