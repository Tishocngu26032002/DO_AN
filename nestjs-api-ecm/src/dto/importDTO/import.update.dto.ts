import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  product_id: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  pricein: number;
}

export class UpdateImpotyDTO {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  import_id: string;

  @IsArray()
  @ValidateNested({ each: true }) // Áp dụng xác thực cho từng phần tử trong mảng
  @Type(() => ProductDto) // Chuyển đổi từng phần tử thành ProductDto
  @IsNotEmpty()
  @ApiProperty({ type: ProductDto, isArray: true })
  products: ProductDto[];
}
