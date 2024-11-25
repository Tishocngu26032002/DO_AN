import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty} from "class-validator";
import {Expose} from "class-transformer";
import {Column} from "typeorm";
import {NotificationType, PaymentMethod} from "src/share/Enum/Enum";

export class CreateNotificationDto {
    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    orderId: string;

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    message: string;

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    adminId: string;

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    isRead: boolean;

    @IsEnum(NotificationType)
    @IsNotEmpty()
    @ApiProperty({enum: NotificationType, default: NotificationType.NewOrder})
    notificationType: NotificationType = NotificationType.NewOrder;
}