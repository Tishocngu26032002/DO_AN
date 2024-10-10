import { Module } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';
import { LoginModuleController } from './login-module.controller';
import { User } from 'src/entities/userentity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('TOKEN_EXPIRE') },
      }),
    }),
  ],
  controllers: [LoginModuleController],
  providers: [LoginModuleService],
})
export class LoginModuleModule {}
