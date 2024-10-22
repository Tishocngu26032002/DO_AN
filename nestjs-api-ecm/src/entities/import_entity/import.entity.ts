import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'import' })
export class ImportEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'int' })
  total_amount: number;
  @Column({ type: 'text' })
  employee_id: string;
  @Column({ type: 'timestamp' })
  createdAt: Date;
}
