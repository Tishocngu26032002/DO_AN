import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from 'src/entities/product_entity/product.entity';

@Entity({ name: 'suppliers' })
export class SupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  address: string;

}
