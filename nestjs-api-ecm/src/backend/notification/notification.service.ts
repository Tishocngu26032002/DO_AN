import { Injectable } from '@nestjs/common';
import {Notification} from "src/entities/notification_entity/Notification";
import {NotificationRepository} from "src/repository/NotificationRepository";
import {BaseService} from "src/base/baseService/base.service";
import {OrderEntity} from "src/entities/order_entity/oder.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateNotificationDto} from "src/dto/notificationDTO/create-notification.dto";
import {NotificationStatus, NotificationType} from "src/share/Enum/Enum";
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService{
    private db;
    constructor(
        @InjectRepository(Notification)
        private readonly notiRepo: NotificationRepository
    ) {
        if (!admin.apps.length) {
            const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
            const serviceAccount = require(serviceAccountPath);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: process.env.FIREBASE_SERVICE_DATABASE
            });
        }
    }

    // Tạo thông báo mới
    async createNotification(orderId: string, message: string, admins: any[], notificationType: NotificationType) {
        const notifications = admins.map((admin) => {
            return this.notiRepo.create({
                orderId,
                message,
                adminId: admin.id,
                isRead: false,
                notificationType: notificationType
            });
        });
        await this.notiRepo.save(notifications);
    }


    async sendNotification(order: OrderEntity, message: string, status: NotificationStatus.Success, notificationType: NotificationType): Promise<void> {
        const db = admin.database();
        const notificationsRef = db.ref('notificationAdmins');
        const newNotification = {
            order_id: order.id,
            isRead: false,
            message,
            createdAt: order.createdAt.toISOString(),
            status: status,
            notificationType: notificationType
        };
        await notificationsRef.push(newNotification);
    }
}
