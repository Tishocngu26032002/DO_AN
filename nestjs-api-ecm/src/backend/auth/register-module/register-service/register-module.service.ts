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
import { v4 as uuidv4 } from "uuid";
import { plainToClass } from "class-transformer";

@Injectable()
export class RegisterModuleService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }
  async create(CreateUserDTO: CreateUserDto) {
    let userAdd = plainToClass(User, CreateUserDTO);
    async function sendEmail(email: string): Promise<boolean> {
      try {
        // Thiết lập OTP
        const secret = email;
        authenticator.options = { digits: 6, step: 120 }; // OTP có hiệu lực trong 2 phút
        const token = authenticator.generate(secret);
        console.log(token);
        // Tạo transporter để gửi email
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: Account.USER,
            pass: Account.PASS,
          },
        });

        // Thiết lập thông tin email
        const mailOptions = {
          from: Account.USER,
          to: email,
          subject: 'OTP Register Account',
          text: `YourOTP(It will expire after 2 minutes): ${token}`,
        };
        console.log(mailOptions);

        // Gửi email và chờ kết quả
        await transporter.sendMail(mailOptions);

        // Nếu thành công, trả về true
        return true;
      } catch (error) {
        // Ép kiểu lỗi về dạng có thể có 'responseCode'
        if (error instanceof Error && 'responseCode' in error) {
          const err = error as any; // Tạm ép kiểu về 'any' để tránh lỗi TypeScript
          if (err.responseCode === 550) {
            throw new Error('Email không tồn tại. Vui lòng nhập email hợp lệ.');
          }
        }

        // Xử lý lỗi chung
        throw new Error('Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.');
      }
    }

    // check exists?
    const checkExists = await this.userRepository.findOneBy({
      email: userAdd.email,
    });
    console.log("Check if user exists:", checkExists);

    // throw error exsist
    if (checkExists?.isActive) {
      console.log("Account exists and is active");
      throw new Error('REGISTER.ACCOUNT EXISTS!');
    }

    if (checkExists && !checkExists.isActive) {
      console.log("Account exists but is not active, sending OTP");
      sendEmail(checkExists.email);
      throw new Error('REGISTER.ACCOUNT NOT VERIFY! PLEASE ENTER OTP VERIFY!');
    }
    // hashPassword
    console.log("Hashing password for user");
    userAdd.id = uuidv4();
    const hashPassword = await bcrypt.hash(userAdd.password, 10);
    userAdd.password = hashPassword;

    // insert into db
    console.log("Saving user to database");
    const check = await this.userRepository.save(userAdd);
    console.log("Saved user:", check); // Log the saved user details
    // check action insert
    if (!check) {
      throw new Error('REGISTER.OCCUR ERROR WHEN SAVE TO DATABASE!');
    }

    let email = null;
    // email = check.email;
    // sendEmail(email);
    if (email) {
      console.log("Sending OTP to:", email);
      await sendEmail(email);
    } else {
      console.log("Email is undefined after save!");
      throw new Error("Failed to retrieve user email after save.");
    }

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
