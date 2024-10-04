import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from 'src/backend/user/user.service';
import { CreateUserDto } from '../../dto/userDTO/user.create.dto';
import { responseHandler } from '../../Until/responseUtil';
import { UpdateUserDto } from '../../dto/userDTO/user.update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return responseHandler.ok(user);
    } catch (e) {
      return responseHandler.error(e.message);
    }
  }

  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number) {
    try {
      const users = await this.usersService.findAll(page, limit);
      console.log(users);
      return responseHandler.ok(users);
    } catch (err) {
      return responseHandler.error(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.usersService.findOne(id);
      return responseHandler.ok(user);
    } catch (err) {
      return responseHandler.error(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return responseHandler.ok(user);
    } catch (err) {
      return responseHandler.error(err.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const check = await this.usersService.remove(id);
      return responseHandler.ok(check);
    } catch (err) {
      return responseHandler.error(err.message);
    }
  }
}
