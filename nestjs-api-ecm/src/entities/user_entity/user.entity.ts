import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base/baseEntity/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'text' })
  firstName: string;
  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, default: 'user' })
  role: string;

  @Column({ default: false })
  isActive: boolean;
}
