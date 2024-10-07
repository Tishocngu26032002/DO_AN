import { Module } from '@nestjs/common';
import { RegisterModuleService } from './register-service/register-module.service';
import { RegisterModuleController } from './register-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../entities/userentity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterModuleController],
  providers: [RegisterModuleService],
})
export class RegisterModuleModule {}
