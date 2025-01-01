import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class MomoService {
  private readonly partnerCode = 'MOMO';
  private readonly accessKey = 'F8BBA842ECF85';
  private readonly secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  private readonly endpoint =
    'https://test-payment.momo.vn/v2/gateway/api/create';

  async createPayment(amount: number, redirectUrl: string, ipnUrl: string) {
    const orderId = this.partnerCode + new Date().getTime();
    const requestId = orderId;
    const orderInfo = 'pay with MoMo';
    const extraData = '';
    const requestType = 'payWithMethod';
    const autoCapture = true;
    const lang = 'vi';

    // Tạo chữ ký HMAC SHA256
    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    // Tạo payload gửi đến MoMo
    const requestBody = {
      partnerCode: this.partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount.toString(),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: '',
      signature: signature,
    };

    try {
      const response = await axios.post(this.endpoint, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data; // Trả về kết quả từ MoMo
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create MoMo payment');
    }
  }
}
