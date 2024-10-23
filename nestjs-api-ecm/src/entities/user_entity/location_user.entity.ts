import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/entities/user_entity/user.entity';

@Entity({ name: 'location_user' })
export class Location_userEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'boolean', default: 'false' })
  default: boolean;

  @Column({ type: 'varchar' })
  user_id: string;

  // Foreign key to User using existing user_id column
  @ManyToOne(() => User, (user) => user.locations)
  @JoinColumn({ name: 'user_id' }) // Explicitly use user_id as the foreign key
  user: User;
}
