import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'location_user' })
export class Location_userEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'boolean', default: 'false' })
  default: boolean;
}
