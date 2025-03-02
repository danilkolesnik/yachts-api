import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get('orders/:userId')
  async getAllOrders(@Param('userId') userId: string) {
    return this.orderService.allOrder(userId);
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
}