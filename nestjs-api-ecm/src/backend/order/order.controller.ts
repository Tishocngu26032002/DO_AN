import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiQuery, ApiTags} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/JwtAuth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { OrderService } from 'src/backend/order/order.service';
import { CreateOrderDto } from 'src/dto/orderDTO/order.create.dto';
import { responseHandler } from 'src/Until/responseUtil';
import { Roles } from 'src/decorator/Role.decorator';
import { OrderAllOrderDto } from 'src/dto/orderDTO/order.allOrder.dto';
import { UpdateOrderDTO } from 'src/dto/orderDTO/order.update.dto';
import {ExpirationStatus, OrderStatus, PaymentStatus} from "src/share/Enum/Enum";

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly order_Service: OrderService) {}

  @Post('all-user-order')
  @Roles('user')
  async getAllOrder(@Body() allOderDTO: OrderAllOrderDto) {
    try {
      const allOrder = await this.order_Service.getAllOrder(allOderDTO);
      return responseHandler.ok(allOrder);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @ApiQuery({
    name: 'orderStatus',
    enum: OrderStatus,
    required: false,
    description: 'Trạng thái đơn hàng (All, Checking, InTransit, Delivered, Canceled)',
  })
  @ApiQuery({
    name: 'paymentStatus',
    enum: PaymentStatus,
    required: false,
    description: 'Trạng thái thanh toán (All, Paid, Unpaid, Debt)',
  })
  @Get('manage-order/:page/:limit')
  @Roles('admin')
  async getOrderManagement(
      @Param('page') page: number,
      @Param('limit') limit: number,
      @Query('orderStatus') orderStatus?: OrderStatus,
      @Query('paymentStatus') paymentStatus?: PaymentStatus,
  ) {
    try {
      const filters = {
        orderStatus: orderStatus !== undefined ? orderStatus : '',
        paymentStatus: paymentStatus !== undefined ? paymentStatus : '',
      };
      const allOrder = await this.order_Service.getOrderManagement(page, limit, filters);
      return responseHandler.ok(allOrder);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Post()
  @Roles('user', 'admin')
  async createOrder(@Body() oderDTO: CreateOrderDto) {
    try {
      const order = await this.order_Service.createOrder(oderDTO);
      return responseHandler.ok(order);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('detail/:id')
  @Roles('user', 'admin')
  async getDetailOrder(@Param('id') id: string) {
    try {
      const orderDetail = await this.order_Service.getDetail(id);
      return responseHandler.ok(orderDetail);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch()
  @Roles('user', 'admin', 'employee')
  async updateOrder(@Body() updateOrderDTO: UpdateOrderDTO) {
    try {
      const orderUpdate = await this.order_Service.updateOrder(updateOrderDTO);
      return responseHandler.ok(orderUpdate);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
