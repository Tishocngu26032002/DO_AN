import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { LocationUserService } from './location_user.service';
import { CreateLocationUserDto } from '../../dto/locationUserDTO/create-location_user.dto';
import { UpdateLocationUserDto } from '../../dto/locationUserDTO/update-location_user.dto';
import {AuthGuard} from "src/guards/JwtAuth.guard";
import {RolesGuard} from "src/guards/Roles.guard";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Roles} from "src/decorator/Role.decorator";
import {ExpirationStatus} from "src/share/Enum/Enum";
import {responseHandler} from "src/Until/responseUtil";

@Controller('location-user')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Location-user')
@ApiBearerAuth()
export class LocationUserController {
  constructor(private readonly locationUserService: LocationUserService) {}

  @Get()
  @Roles('user', 'admin')
  async getAllLocation(@Param('user_id') user_id: string,) {
    try{
      const filters = {
        user_id: user_id,
      };
      const result = this.locationUserService.getList(filters);
      return responseHandler.ok(result);
    }
    catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Post()
  @Roles('user', 'admin')
  async create(@Body() createLocationUserDto: CreateLocationUserDto) {
    try{
      const data = this.locationUserService.createLocation(createLocationUserDto);
      return responseHandler.ok(data);
    }
    catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':id')
  @Roles('user', 'admin')
  async update(
      @Param('id') id: string,
      @Body() updateLocationUserDto: UpdateLocationUserDto,
      @Query('update-default') updateDefault: boolean = false,
  ) {
    try{
      const check = await this.locationUserService.update(updateLocationUserDto, id, updateDefault);
      return responseHandler.ok(check);
    }
    catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  @Roles('user', 'admin')
  async remove(@Param('id') id: string) {
    try{
      const check = await this.locationUserService.delete(id);
      return responseHandler.ok(check);
    }
    catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
