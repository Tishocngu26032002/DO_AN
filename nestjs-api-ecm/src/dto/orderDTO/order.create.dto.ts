import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsInt,
  ValidateNested,
  IsPhoneNumber,
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
  priceout: number;
}

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  totalPrice: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  paymentMethod: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsPhoneNumber(null) // 'null' để chấp nhận tất cả mã vùng, hoặc bạn có thể thêm mã vùng nếu cần
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsArray()
  @ValidateNested({ each: true }) // Áp dụng xác thực cho từng phần tử trong mảng
  @Type(() => ProductDto) // Chuyển đổi từng phần tử thành ProductDto
  @IsNotEmpty()
  @ApiProperty({ type: ProductDto, isArray: true })
  products: ProductDto[];
}
