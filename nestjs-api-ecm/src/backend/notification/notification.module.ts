import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import {NotificationRepository} from "src/repository/NotificationRepository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Notification} from "src/entities/notification_entity/Notification";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
