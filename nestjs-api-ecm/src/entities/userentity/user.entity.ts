import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 255, default: 'user' })
  role: string;

  @Column({ default: true })
  isActive: boolean;
}
