import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body, Query,
} from '@nestjs/common';
import { UserService } from 'src/backend/user/user.service';
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { responseHandler } from 'src/Until/responseUtil';
import { UpdateUserDto } from 'src/dto/userDTO/user.update.dto';
import {ApiBearerAuth, ApiBody, ApiQuery, ApiTags} from '@nestjs/swagger';
import { Roles } from 'src/decorator/Role.decorator';
import {UserSearchDto} from "src/dto/userDTO/user.search.dto";

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':page/:limit')
  @Roles('admin')
  async findAll(@Param('page') page: number, @Param('limit') limit: number) {
    try {
      const users = await this.usersService.findAll(page, limit);
      console.log(users);
      return responseHandler.ok(users);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Post('search/:page/:limit')
  @Roles('admin')
  @ApiBody({ type: UserSearchDto, required: false })
  async findAllBySearch(@Param('page') page: number,
                @Param('limit') limit: number,
                @Body() userSearchDto?: UserSearchDto) {
    try {
      const filters: any = {};
      if(userSearchDto?.lastName != null) filters.lastName = userSearchDto.lastName;
      if(userSearchDto?.phone != null) filters.phone = userSearchDto.phone;
      if(userSearchDto?.email != null) filters.email = userSearchDto.email;
      if(userSearchDto?.role != null) filters.role = userSearchDto.role;
      if(userSearchDto?.isActive != null) filters.isActive = userSearchDto.isActive;
      const users = await this.usersService.findAllBySearch(page, limit, filters);
      console.log(users);
      return responseHandler.ok(users);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':id')
  @Roles('user', 'admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    try {
      const check = await this.usersService.remove(id);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
