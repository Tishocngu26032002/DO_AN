import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { NotificationService } from './notification.service';
import {responseHandler} from "src/Until/responseUtil";

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // API lấy các thông báo chưa đọc của admin
  @Get('unread/:adminId')
  async getUnreadNotifications(@Param('adminId') adminId: string) {
    try {
      const unreadNotifications = await this.notificationService.getUnreadNotifications(adminId);
      return responseHandler.ok(unreadNotifications);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  // API để đánh dấu thông báo là đã đọc
  @Post('read-many')
  async markManyAsRead(@Body() notificationIds: string[]) {
    try {
      await this.notificationService.markManyAsRead(notificationIds);
      return responseHandler.ok('Notifications marked as read successfully');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
