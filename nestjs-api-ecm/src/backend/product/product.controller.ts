import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { responseHandler } from '../../Until/responseUtil';
import { ProductService } from './product.service';
import { categoryUpdateDTO } from '../../dto/categoryDTO/category.update.dto';
import {productCreateDTO} from "src/dto/productDTO/product.create.dto";
import {ExpirationStatus} from "src/share/Enum/Enum";
import {ApiQuery} from "@nestjs/swagger";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':page/:limit')
  @ApiQuery({
    name: 'status',
    enum: ExpirationStatus, // Đây là enum của bạn
    required: false, // Chỉ định nếu tham số này là bắt buộc hay không
    description: 'Trạng thái sản phẩm (Valid, Expired, ExpiringSoon)',
  })
  async getList(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Query('status') status?: ExpirationStatus,
  ) {
    try {
      const filters = {
        status: status !== undefined ? status : '', // Kiểm tra nếu status không được truyền
      };
      const listProduct= await this.productService.getList(
        page,
        limit,
        filters,
      );
      return responseHandler.ok(listProduct);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Post()
  async create(@Body() createProduct: productCreateDTO) {
    try {
      const product = await this.productService.create(createProduct);
      return responseHandler.ok(product);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    try {
      return responseHandler.ok(await this.productService.detail(id));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('categoryUpdateDTO') categoryUpdateDTO: categoryUpdateDTO,
  ) {
    try {
      const check = await this.productService.update(categoryUpdateDTO, id);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {}
}
