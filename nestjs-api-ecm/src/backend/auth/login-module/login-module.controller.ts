import { Controller, Post, Body } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';
import { LoginDTO } from 'src/dto/loginDTO/login.dto';
import { responseHandler } from '../../../Until/responseUtil';

@Controller('login')
export class LoginModuleController {
  constructor(private readonly loginModuleService: LoginModuleService) {}

  @Post()
  async login(@Body() login: LoginDTO) {
    try {
      const access = await this.loginModuleService.login(login);
      return responseHandler.ok(access);
    } catch (err) {
      // @ts-ignore
      return responseHandler.unauthorized(err.message);
    }
  }
}
