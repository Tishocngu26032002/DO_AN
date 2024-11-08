import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderAllOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;
}
