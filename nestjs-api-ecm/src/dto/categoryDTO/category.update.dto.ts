import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class categoryUpdateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;
  c_slug: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  avatar: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  banner: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  hot: number | 0;
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  status: boolean;
}
