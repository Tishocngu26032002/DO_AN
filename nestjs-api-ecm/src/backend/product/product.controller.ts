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
import { categoryCreateDTO } from '../../dto/categoryDTO/category.create.dto';
import { ProductService } from './product.service';
import { categoryUpdateDTO } from '../../dto/categoryDTO/category.update.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':page/:limit/:hot?/:status?')
  async getList(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Query('hot') hot?: number,
    @Query('status') status?: number,
  ) {
    try {
      const filters = {
        hot: hot !== undefined ? hot : '', // Kiểm tra nếu hot không được truyền
        status: status !== undefined ? status : '', // Kiểm tra nếu status không được truyền
      };
      const listcategory = await this.productService.getList(
        page,
        limit,
        filters,
      );
      return responseHandler.ok(listcategory);
    } catch (e) {
      return responseHandler.error(e.message);
    }
  }

  // @Post()
  // async create(@Body() createCate: categoryCreateDTO) {
  //   try {
  //     const category = await this.categoryService.create(createCate);
  //     return responseHandler.ok(category);
  //   } catch (e) {
  //     return responseHandler.error(e.message);
  //   }
  // }
  //
  // @Get(':id')
  // async detail(@Param('id') id: number) {
  //   try {
  //     return responseHandler.ok(await this.categoryService.detail(id));
  //   } catch (e) {
  //     return responseHandler.error(e.message);
  //   }
  // }
  //
  // @Patch(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body('categoryUpdateDTO') categoryUpdateDTO: categoryUpdateDTO,
  // ) {
  //   try {
  //     const check = await this.categoryService.update(id, categoryUpdateDTO);
  //     return responseHandler.ok(check);
  //   } catch (e) {
  //     responseHandler.error(e.message);
  //   }
  // }
  //
  // @Delete(':id')
  // async delete(@Param('id') id: number) {}
}
