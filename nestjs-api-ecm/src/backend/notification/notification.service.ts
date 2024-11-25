import { Injectable } from '@nestjs/common';
import {Notification} from "src/entities/notification_entity/Notification";
import {NotificationRepository} from "src/repository/NotificationRepository";
import {BaseService} from "src/base/baseService/base.service";
import {OrderEntity} from "src/entities/order_entity/oder.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateNotificationDto} from "src/dto/notificationDTO/create-notification.dto";
import {NotificationType} from "src/share/Enum/Enum";


@Injectable()
export class NotificationService{
    constructor(
        @InjectRepository(Notification)
        private readonly notiRepo: NotificationRepository
    ) {}

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

    // Lấy các thông báo chưa đọc
    async getUnreadNotifications(adminId: string) {
    }

    // Đánh dấu thông báo là đã đọc
    async markManyAsRead(notificationIds: string[]) {
        // Iterate over the notification IDs and mark each as read
        for (const notificationId of notificationIds) {
            await this.notiRepo.update(notificationId, { isRead: true });
        }
    }
}
