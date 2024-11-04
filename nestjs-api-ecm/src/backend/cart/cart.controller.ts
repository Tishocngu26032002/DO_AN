import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from '../../dto/cart_product/create-cart.dto';
import { UpdateCartDto } from '../../dto/cart_product/update-cart.dto';
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "src/guards/JwtAuth.guard";
import {RolesGuard} from "src/guards/Roles.guard";
import {ApplyStatus, ExpirationStatus} from "src/share/Enum/Enum";
import {Roles} from "src/decorator/Role.decorator";
import {responseHandler} from "src/Until/responseUtil";
import {CategoryCreateDTO} from "src/dto/categoryDTO/category.create.dto";
import {UpdateLocationUserDto} from "src/dto/locationUserDTO/update-location_user.dto";
import {ParseBooleanPipe} from "src/share/ParseBooleanPipe";

@Controller('cart')
@ApiTags('Cart')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':page/:limit')
  @Roles('admin')
  async getListCart(
      @Param('page') page: number,
      @Param('limit') limit: number,
  ) {
    try {
      const listCart = await this.cartService.getList(
          page,
          limit,
      );
      return responseHandler.ok(listCart);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Post('add-to-cart')
  @Roles('user')
  async addToCart(@Body() createCartDto: CreateCartDto) {
    try {
      const addToCart = await this.cartService.create(createCartDto);
      return responseHandler.ok(addToCart);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Get('all-product-in-cart')
  @Roles('user')
  async getAllProductInCart(
      @Query('user_id') user_id: string,
  ) {
    try {
      const filters = {
        user_id: user_id,
      };
      const allProduct = await this.cartService.getListProduct(filters);
      return responseHandler.ok(allProduct);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Patch()
  @Roles('user')
  async update(@Body() updateCartDto: UpdateCartDto) {
    try {
      const productUpdate = await this.cartService.update(updateCartDto, updateCartDto.id);
      return responseHandler.ok(productUpdate);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }

  @Delete(':id')
  @Roles('user')
  async delete(@Param('id') id: string) {
    try {
      const check = await this.cartService.delete(id);
      return responseHandler.ok(check);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      return responseHandler.error(errorMessage);
    }
  }
}
