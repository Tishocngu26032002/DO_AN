import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'import_product' })
export class Import_productEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'int' })
  price_in: number;
  @Column({ type: 'text' })
  product_id: string;

  @Column({ type: 'text' })
  import_id: string;
}
