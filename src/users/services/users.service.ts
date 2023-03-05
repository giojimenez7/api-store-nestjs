import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 1;

  private users: User[] = [
    {
      id: this.counterId,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId++;

    const newUser = {
      id: this.counterId,
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    const index = this.users.findIndex((user) => user.id === id);

    this.users[index] = {
      ...user,
      ...payload,
    };

    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }

    this.users.splice(index, 1);

    return true;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
