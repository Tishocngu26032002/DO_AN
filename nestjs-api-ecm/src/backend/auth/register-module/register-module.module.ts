import { Module } from '@nestjs/common';
import { RegisterModuleService } from './register-service/register-module.service';
import { RegisterModuleController } from './register-module.controller';

@Module({
  controllers: [RegisterModuleController],
  providers: [RegisterModuleService],
})
export class RegisterModuleModule {}
