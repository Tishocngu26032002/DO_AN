import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { RegisterModuleService } from './register-service/register-module.service';
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { UpdateUserDto } from 'src/dto/userDTO/user.update.dto';

@Controller('register-module')
export class RegisterModuleController {
  constructor(private readonly registerModuleService: RegisterModuleService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDto) {
    return this.registerModuleService.create(createUserDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserDTO: UpdateUserDto) {
    return this.registerModuleService.update(+id, UpdateUserDTO);
  }
}
