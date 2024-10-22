import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'oder_product' })
export class Order_Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  priceout: number;

  @Column({ type: 'text' })
  order_id: string;

  @Column({ type: 'text' })
  product_id: string;
}
