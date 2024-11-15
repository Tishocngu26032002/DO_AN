import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Like, Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user_entity/user.entity';
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { UpdateUserDto } from 'src/dto/userDTO/user.update.dto';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import {ProductEntity} from "src/entities/product_entity/product.entity";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userAdd = plainToClass(User, createUserDto);
    const chechExists = await this.usersRepository.findOneBy({
      email: userAdd.email,
    });
    // throw error exsist
    if (chechExists?.isActive) {
      throw new Error('ACCOUNT EXSIST!');
    }

    userAdd.id = uuidv4();
    // hashPassword
    const hashPassword = await bcrypt.hash(userAdd.password, 10);
    userAdd.password = hashPassword;

    // insert into db
    const check = await this.usersRepository.save(userAdd);
    // check action insert
    if (!check) {
      throw new Error('OCCUR ERROR WHEN SAVE USER TO DB!');
    }
    return {
      email: check.email,
    };
  }

  async findAll(page: number = 1, limit: number = 10, filters: any) {
    if (page < 1) {
      throw new Error('PAGE NUMBER MUST BE GREATER THAN 0!');
    }

    if (limit < 1) {
      throw new Error('LIMIT MUST BE GREATER THAN 0!');
    }
    const whereConditions: any = {};
    if (filters.name) {
      whereConditions.lastName = Like(`%${filters.name}%`);
    }
    if (filters.phone) {
      whereConditions.phone = Like(`%${filters.phone}%`);
    }
    if (filters.role) {
      whereConditions.role = filters.role;
    }
    if (filters.isActive != undefined) {
      whereConditions.isActive = filters.isActive;
    }
    const [users, total] = await this.usersRepository.findAndCount({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!users) throw new Error('NO USER!');

    return {
      data: users,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      throw new Error('USER WITH ID ${id} NOT FOUND!');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`USER WITH ID ${id} NOT FOUND!`);
    }

    Object.assign(user, updateUserDto);

    const check = await this.usersRepository.save(user);

    if (!check) throw new Error('UPDATE NOT SUCCESS!');

    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`USER WITH ID ${id} NOT FOUND`);
    }

    user.isActive = false;

    const check = await this.usersRepository.save(user);

    if (!check) throw new Error('REMOVE NOT SUCCESS!');

    return user;
  }
}
