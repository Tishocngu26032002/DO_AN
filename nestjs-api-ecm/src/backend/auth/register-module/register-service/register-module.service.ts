import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User } from 'src/entities/userentity/user.entity';
import { CreateUserDto } from 'src/dto/userDTO/user.create.dto';
import { authenticator } from 'otplib';
import { Account } from 'src/Until/configConst';
import { VerifyDto } from 'src/dto/userDTO/user.verify.dto';

@Injectable()
export class RegisterModuleService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(CreateUserDTO: CreateUserDto) {
    function sendEmail(email): any {
      const secret = email;
      authenticator.options = { digits: 6, step: 120 };
      const token = authenticator.generate(secret);
      // send otp by email
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
        subject: 'OTP Regiter Account',
        text: `Your OTP (It is expired after 2 min) : ${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new Error('REGISTER.EMAIL SEND FAILED!');
        }
      });
      return true;
    }

    // check exists?
    const checkExists = await this.userRepository.findOneBy({
      email: CreateUserDTO.email,
    });

    // throw error exsist
    if (checkExists?.isActive) {
      throw new Error('REGISTER.ACCOUNT EXISTS!');
    }

    if (checkExists && !checkExists.isActive) {
      sendEmail(checkExists.email);
      throw new Error('REGISTER.ACCOUNT NOT VERIFY! PLEASE ENTER OTP VERIFY!');
    }
    // hashPassword
    const hashPassword = await bcrypt.hash(CreateUserDTO.password, 10);
    CreateUserDTO.password = hashPassword;
    // insert into db
    const user = this.userRepository.create(CreateUserDTO);
    const check = await this.userRepository.save(user);
    // check action insert
    if (!check) {
      throw new Error('REGISTER.OCCUR ERROR WHEN SAVE TO DATABASE!');
    }

    let email = null;
    // send email OTP
    email = check.email;
    sendEmail(email);

    return {
      email: check.email,
    };
  }

  async update(verifyDto: VerifyDto) {
    const token = verifyDto.otp;
    const secret = verifyDto.email;

    authenticator.options = { digits: 6, step: 120 };
    const verify = authenticator.verify({ token, secret });

    if (!verify) {
      throw new Error('REGISTER.OTP EXPIRED!');
    }

    const check = await this.userRepository.update(
      { email: secret },
      { isActive: true },
    );

    if (!check) {
      throw new Error('REGISTER.UPDATE ACTIVE FAILED!');
    }

    return true;
  }
}
