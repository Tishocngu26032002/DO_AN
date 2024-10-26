import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import {ExpirationStatus} from "src/share/Enum/Enum";

export class productCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  priceout: number;
  slug: string;
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
  stockQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  url_images: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  category_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  supplier_id: string;

  @ApiProperty({ enum: ExpirationStatus })
  @IsNotEmpty()
  @Expose()
  status: ExpirationStatus;
}
