import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User } from 'src/entities/user_entity/user.entity';
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { authenticator } from 'otplib';
import { Account } from 'src/Until/configConst';
import { VerifyDto } from 'src/dto/userDTO/user.verify.dto';
import { Location_userEntity } from 'src/entities/user_entity/location_user.entity';

@Injectable()
export class RegisterModuleService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Location_userEntity)
    private readonly locationRepository: Repository<Location_userEntity>,
    private readonly dataSource: DataSource,
  ) {
    authenticator.options = { digits: 6, step: 120 };
  }

  private async sendEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: Account.USER,
        pass: Account.PASS,
      },
    });

    const mailOptions = {
      from: Account.USER,
      to: email,
      subject: 'OTP Register Account',
      text: `Your OTP (It will expire after 2 minutes): ${token}`,
    };

    return transporter.sendMail(mailOptions);
  }

  async create(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser?.isActive) {
      throw new Error('REGISTER.ACCOUNT EXISTS!');
    }

    if (existingUser && !existingUser.isActive) {
      await this.sendEmail(
        existingUser.email,
        authenticator.generate(existingUser.email),
      );
      throw new Error('REGISTER.ACCOUNT NOT VERIFY! PLEASE ENTER OTP VERIFY!');
    }

    // Start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Prepare user data
      const user = this.userRepository.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
      });

      // Save user and get the ID
      const savedUser = await queryRunner.manager.save(user);

      // Prepare location data
      const location = this.locationRepository.create({
        address: createUserDto.address,
        phone: createUserDto.phone,
        default_location: true,
        user_id: savedUser.id,
      });

      // Save location
      await queryRunner.manager.save(location);

      // Commit transaction
      await queryRunner.commitTransaction();

      // Send OTP email
      await this.sendEmail(
        savedUser.email,
        authenticator.generate(savedUser.email),
      );

      return { email: savedUser.email };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'REGISTER.OCCUR ERROR WHEN SAVE TO DATABASE!',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async update(verifyDto: VerifyDto) {
    const token = verifyDto.otp;
    const secret = verifyDto.email;

    const isVerified = authenticator.check(token, secret);
    if (!isVerified) {
      throw new Error('REGISTER.OTP EXPIRED!');
    }

    const result = await this.userRepository.update(
      { email: secret },
      { isActive: true },
    );

    if (result.affected === 0) {
      throw new Error('REGISTER.UPDATE ACTIVE FAILED!');
    }

    return true;
  }
}
