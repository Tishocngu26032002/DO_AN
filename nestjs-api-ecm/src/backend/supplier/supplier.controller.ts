import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from '../../dto/supplierDTO/create-supplier.dto';
import { UpdateSupplierDto } from '../../dto/supplierDTO/update-supplier.dto';
import {responseHandler} from "src/Until/responseUtil";
import {AuthGuard} from "src/guards/JwtAuth.guard";
import {RolesGuard} from "src/guards/Roles.guard";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Roles} from "src/decorator/Role.decorator";
import {ApplyStatus} from "src/share/Enum/Enum";

@Controller('supplier')
@ApiTags('Supplier')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}


  @Get()
  @Roles('admin')
  async getList(
      @Param('page') page: number,
      @Param('limit') limit: number,
  ) {
    try {
      const filters = {
        status: status !== undefined ? status : '',
      };
      const listcategory = await this.supplierService.getList(
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
  @Roles('admin')
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    try {
      const supplierAdd = await this.supplierService.create(createSupplierDto);
      return responseHandler.ok(supplierAdd);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    try {
      const supplierGetById = await this.supplierService.findOne(id);
      return responseHandler.ok(supplierGetById);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    try {
      const updateSupplier = await this.supplierService.update(updateSupplierDto, id);
      return responseHandler.ok(updateSupplier);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    try {
      const deleteSupplier = await this.supplierService.delete(id);
      return responseHandler.ok(deleteSupplier);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
