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
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { categoryCreateDTO } from '../../dto/categoryDTO/category.create.dto';
import { responseHandler } from '../../Until/responseUtil';
import { categoryUpdateDTO } from '../../dto/categoryDTO/category.update.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
      const listcategory = await this.categoryService.getList(
        page,
        limit,
        filters,
      );
      return responseHandler.ok(listcategory);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
      /*return responseHandler.error(e.);*/
    }
  }

  @Post()
  async create(@Body() createCate: categoryCreateDTO) {
    try {
      const category = await this.categoryService.create(createCate);
      return responseHandler.ok(category);
    } catch (e) {
      return responseHandler.error(e.message);
    }
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    try {
      return responseHandler.ok(await this.categoryService.detail(id));
    } catch (e) {
      return responseHandler.error(e.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('categoryUpdateDTO') categoryUpdateDTO: categoryUpdateDTO,
  ) {
    try {
      const check = await this.categoryService.update(categoryUpdateDTO, id);
      return responseHandler.ok(check);
    } catch (e) {
      responseHandler.error(e.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {}
}
