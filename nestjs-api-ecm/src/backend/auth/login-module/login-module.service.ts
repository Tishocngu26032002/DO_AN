import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from 'src/dto/loginDTO/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/userentity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginModuleService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  async login(loginDTO: LoginDTO) {
    const check = await this.userRepository.findOneBy({
      email: loginDTO.email,
    });

    // check account
    if (!check) {
      throw new NotFoundException('LOGIN.USER.EMAIL IS NOT VALID!');
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginDTO.password,
      check.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('LOGIN.USER.PASSWORD IS NOT VALID!');
    }

    // generate accessToken
    try {
      const accessToken = await this.jwt.signAsync(
        { id: check.id, email: check.email, role: check.role },
        { secret: this.configService.get('JWT_SECRET') },
      );
      return accessToken;
    } catch (error) {
      throw new Error('LOGIN.UNABLE GENERATE TOKEN!');
    }
  }
}
