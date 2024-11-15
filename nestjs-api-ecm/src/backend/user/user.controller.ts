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
import {ApiBearerAuth, ApiQuery, ApiTags} from '@nestjs/swagger';
import { Roles } from 'src/decorator/Role.decorator';
import {ParseBooleanPipe} from "src/share/ParseBooleanPipe";

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Tên người dùng',
  })
  @ApiQuery({
    name: 'phone',
    required: false,
    description: 'Số điện thoại',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    description: 'Quyền người dùng',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Trạng thái tài khoản',
    type: Boolean,
  })
  @Get(':page/:limit')
  @Roles('admin')
  async findAll(@Param('page') page: number,
                @Param('limit') limit: number,
                @Query('name') name?: string,
                @Query('phone') phone?: string,
                @Query('role') role?: string,
                @Query('isActive', ParseBooleanPipe) isActive?: boolean) {
    try {
      const filters = {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      };
      const users = await this.usersService.findAll(page, limit, filters);
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
