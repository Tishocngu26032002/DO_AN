import { Controller, Post, Body } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';
import { LoginDTO } from 'src/dto/loginDTO/login.dto';
import { responseHandler } from 'src/Until/responseUtil';
import { ApiTags } from '@nestjs/swagger';

@Controller('login')
@ApiTags('Login')
export class LoginModuleController {
  constructor(private readonly loginModuleService: LoginModuleService) {}

  @Post()
  async login(@Body() login: LoginDTO) {
    try {
      const access = await this.loginModuleService.login(login);
      return responseHandler.ok(access);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
