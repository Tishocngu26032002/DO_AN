import { Module } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';
import { LoginModuleController } from './login-module.controller';
import { User } from 'src/entities/userentity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'tuyen',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [LoginModuleController],
  providers: [LoginModuleService],
})
export class LoginModuleModule {}
