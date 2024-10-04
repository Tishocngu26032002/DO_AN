import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class categoryCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  c_name: string;
  c_slug: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  c_avatar: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  c_banner: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  c_description: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  c_hot: number | 0;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  c_status: boolean;
}
