import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {NotificationType} from "src/share/Enum/Enum";
import { BaseEntity } from 'src/base/baseEntity/base.entity';

@Entity({ name:'notifications'})
export class Notification extends BaseEntity{

    @Column({ type: 'varchar' })
    orderId: string;

    @Column({ type: 'varchar' })
    message: string;

    @Column({ type: 'varchar' })
    adminId: string;

    @Column({ default: false,  type: 'int' })
    isRead: boolean;

    @Column({ type: 'varchar' })
    notificationType: NotificationType;
}
