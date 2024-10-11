import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/JwtAuth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorator/Role.decorator';
import { responseHandler } from 'src/Until/responseUtil';
import { categoryCreateDTO } from 'src/dto/categoryDTO/category.create.dto';
import { CategoryService } from 'src/backend/category/category.service';
import { categoryUpdateDTO } from 'src/dto/categoryDTO/category.update.dto';

@Controller('category')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':page/:limit/:hot?/:status?')
  @Roles('admin')
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
    }
  }

  @Post()
  async create(@Body() createCate: categoryCreateDTO) {
    try {
      const category = await this.categoryService.create(createCate);
      return responseHandler.ok(category);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    try {
      return responseHandler.ok(await this.categoryService.detail(id));
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
      const check = await this.categoryService.update(categoryUpdateDTO, id);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {}
}
