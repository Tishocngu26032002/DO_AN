import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user_entity/user.entity';
import { RegisterModuleController } from 'src/backend/auth/register-module/register-module.controller';
import { RegisterModuleService } from 'src/backend/auth/register-module/register-service/register-module.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterModuleController],
  providers: [RegisterModuleService],
})
export class RegisterModuleModule {}
