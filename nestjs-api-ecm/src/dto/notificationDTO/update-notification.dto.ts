import {ApiProperty, PartialType} from "@nestjs/swagger";
import {CreateLocationUserDto} from "src/dto/locationUserDTO/create-location_user.dto";
import {IsNotEmpty} from "class-validator";
import {Expose} from "class-transformer";
import {CreateNotificationDto} from "src/dto/notificationDTO/create-notification.dto";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    id: string;
}