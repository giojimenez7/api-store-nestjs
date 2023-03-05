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

import { BrandsService } from '../services/brands.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'List of brands' })
  getAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create brand' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update brand' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete brand' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(id);
  }
}
