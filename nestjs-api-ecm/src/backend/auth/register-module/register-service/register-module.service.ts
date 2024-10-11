import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/userentity/user.entity';
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { UpdateUserDto } from 'src/dto/userDTO/user.update.dto';

@Injectable()
export class RegisterModuleService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(CreateUserDTO: CreateUserDto) {
    // check exists?
    const checkExists = await this.userRepository.findOneBy({
      phone: CreateUserDTO.phone,
    });

    // throw error exsist
    if (checkExists?.isActive) {
      throw new Error('REGISTER.ACCOUNT EXISTS!');
    }

    if (!checkExists?.isActive) {
    }

    // hashPassword
    const hashPassword = await bcrypt.hash(CreateUserDTO.password, 10);
    CreateUserDTO.password = hashPassword;

    // insert into db
    const user = this.userRepository.create(CreateUserDTO);
    const check = await this.userRepository.save(user);

    if (!check) {
      throw new Error('REGISTER.OCCUR ERROR WHEN SAVE TO DATABASE!');
    }

    // send email OTP

    return {
      email: check.email,
    };
  }
  update(id: number, UpdateUserDTO: UpdateUserDto) {
    return `This action updates a #${id} registerModule`;
  }
}
