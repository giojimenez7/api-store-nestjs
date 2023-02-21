import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll() {
    return {
      message: 'orders',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `order ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
