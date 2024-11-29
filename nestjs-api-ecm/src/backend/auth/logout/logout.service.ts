import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user_entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogoutService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async logout(user_id: string, token: string) {
    const user = await this.userRepo.findOneBy({
      id: user_id,
      token: token,
    });

    if (!user) {
      throw new Error('LOGOUT.USER NOT LOGIN!');
    }

    user.token = null;
    const checkSave = await this.userRepo.save(user);

    if (!checkSave) {
      throw new Error('LOGOUT.OCCUR ERROR WHEN LOGOUT!');
    }

    return true;
  }
}
