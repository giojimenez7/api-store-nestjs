import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  @Get()
  @ApiOperation({ summary: 'List of orders' })
  getAll() {
    return {
      message: 'orders',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order' })
  getOne(@Param('id') id: string) {
    return {
      message: `order ${id}`,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create order' })
  create(@Body() payload: any) {
    return {
      message: 'create',
      payload,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order' })
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
