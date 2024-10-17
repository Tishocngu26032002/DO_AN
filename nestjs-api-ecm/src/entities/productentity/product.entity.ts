import { Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  id: string;
}
