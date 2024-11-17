import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImportService } from './import.service';
import { CreateImportDto } from 'src/dto/importDTO/import.create.dto';
import { responseHandler } from 'src/Until/responseUtil';
import { UpdateImpotyDTO } from 'src/dto/importDTO/import.update.dto';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  async create(@Body() createImportDto: CreateImportDto) {
    try {
      const import_Product = await this.importService.create(createImportDto);
      return responseHandler.ok(import_Product);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get()
  findAll() {
    return this.importService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportDto: UpdateImpotyDTO) {
    return this.importService.update(updateImportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importService.remove(+id);
  }
}
