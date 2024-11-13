import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/JwtAuth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { OrderService } from 'src/backend/order/order.service';
import { CreateOrderDto } from 'src/dto/orderDTO/order.create.dto';
import { responseHandler } from 'src/Until/responseUtil';
import { Roles } from 'src/decorator/Role.decorator';
import { OrderAllOrderDto } from 'src/dto/orderDTO/order.allOrder.dto';
import { UpdateOrderDTO } from 'src/dto/orderDTO/order.update.dto';

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly order_Service: OrderService) {}

  @Get()
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

  @Get('detail')
  @Roles('user', 'admin')
  async getDetailOrder(@Body() order_id: string) {
    try {
      const orderDetail = await this.order_Service.getDetail(order_id);
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
      return orderUpdate;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
