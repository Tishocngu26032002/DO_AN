import { Controller, Post, Body } from '@nestjs/common';
import { MomoService } from './momo.service';
import {ApiTags} from "@nestjs/swagger";

@Controller('momo')
@ApiTags('Payment')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post('create-payment')
  async createPayment(
    @Body() body: { amount: number; redirectUrl: string; ipnUrl: string },
  ) {
    const { amount, redirectUrl, ipnUrl } = body;
    try {
      const paymentResponse = await this.momoService.createPayment(
        amount,
        redirectUrl,
        ipnUrl,
      );
      return paymentResponse;
    } catch (error) {
      return { message: 'Error creating payment' };
    }
  }
}
