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

import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order' })
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
