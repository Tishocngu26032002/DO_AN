import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, UseGuards,
} from '@nestjs/common';
import { responseHandler } from '../../Until/responseUtil';
import { ProductService } from './product.service';
import {ExpirationStatus} from "src/share/Enum/Enum";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "src/guards/JwtAuth.guard";
import {RolesGuard} from "src/guards/Roles.guard";
import {Roles} from "src/decorator/Role.decorator";
import {ProductUpdateDTO} from "src/dto/productDTO/product.update.dto";
import {ProductCreateDTO} from "src/dto/productDTO/product.create.dto";

@Controller('product')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':page/:limit')
  @ApiQuery({
    name: 'status',
    enum: ExpirationStatus,
    required: false,
    description: 'Trạng thái sản phẩm (All, Valid, Expired, ExpiringSoon)',
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
  @Roles('admin')
  async create(@Body() createProduct: ProductCreateDTO) {
    try {
      const product = await this.productService.create(createProduct);
      return responseHandler.ok(product);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    try {
      return responseHandler.ok(await this.productService.detail(id));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() productUpdateDTO: ProductUpdateDTO,
  ) {
    try {
      const check = await this.productService.update(productUpdateDTO, id);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    try {
      const check = await this.productService.delete(id);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
