import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dtos';

@Injectable()
export class CustomersService {
  private counterId = 1;

  private customers: Customer[] = [
    {
      id: this.counterId,
      name: 'Giovanny',
      lastName: 'Jimenez',
      phone: '3251458796',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;

    const newCustomer = {
      id: this.counterId,
      ...payload,
    };

    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    const index = this.customers.findIndex((customer) => customer.id === id);

    this.customers[index] = {
      ...customer,
      ...payload,
    };

    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    this.customers.splice(index, 1);

    return true;
  }
}
