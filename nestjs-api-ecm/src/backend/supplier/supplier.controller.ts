import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from '../../dto/supplierDTO/create-supplier.dto';
import { UpdateSupplierDto } from '../../dto/supplierDTO/update-supplier.dto';
import {responseHandler} from "src/Until/responseUtil";

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    try {
      const supplierAdd = this.supplierService.create(createSupplierDto);
      return responseHandler.ok(supplierAdd);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const supplierGetById = this.supplierService.findOne(+id);
      return responseHandler.ok(supplierGetById);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    try {
      const updateSupplier = this.supplierService.update(updateSupplierDto, +id);
      return responseHandler.ok(updateSupplier);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const deleteSupplier = this.supplierService.delete(+id);
      return responseHandler.ok(deleteSupplier);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
