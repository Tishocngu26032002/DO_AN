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
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { responseHandler } from 'src/Until/responseUtil';
import { UpdateUserDto } from 'src/dto/userDTO/user.update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/Role.decorator';

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':user_id/:page/:limit')
  @ApiOperation({
    summary: 'get all user',
    description: 'get all user by admin',
  })
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

  @Post(':user_id')
  @ApiOperation({ summary: 'create user', description: 'create user' })
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

  //get info user for user
  @Get(':user_id')
  @ApiOperation({
    summary: 'get info user for user',
    description: 'get info user for user',
  })
  @Roles('user')
  async findOne(@Param('user_id') user_id: string) {
    try {
      const user = await this.usersService.findOne(user_id);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  //get info user for admin
  @Get(':user_id:/user_id_get')
  @ApiOperation({
    summary: 'get info user by admin',
    description: 'get info user by admin',
  })
  @Roles('admin')
  async findOneByAdmin(
    @Param('user_id') user_id: string,
    @Param('user_id_get') user_id_get: string,
  ) {
    try {
      const user = await this.usersService.findOne(user_id_get);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':user_id')
  @ApiOperation({
    summary: 'update info by user',
    description: 'update info by user',
  })
  @Roles('user')
  async update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(user_id, updateUserDto);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch(':user_id:/user_id_user')
  @ApiOperation({
    summary: 'update info user by admin',
    description: 'update info user by admin',
  })
  @Roles('admin')
  async updateByAdmin(
    @Param('user_id_user') user_id_user: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(user_id_user, updateUserDto);
      return responseHandler.ok(user);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':user_id:/user_id_user')
  @Roles('admin')
  async remove(@Param('user_id_user') user_id_user: string) {
    try {
      const check = await this.usersService.remove(user_id_user);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
