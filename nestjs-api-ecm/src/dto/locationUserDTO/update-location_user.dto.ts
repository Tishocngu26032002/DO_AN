import { PartialType } from '@nestjs/swagger';
import { CreateLocationUserDto } from './create-location_user.dto';

export class UpdateLocationUserDto extends PartialType(CreateLocationUserDto) {}
