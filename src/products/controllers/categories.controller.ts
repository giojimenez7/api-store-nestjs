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

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CategoriesService } from '../services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  // @Get(':id/products/:productId')
  // getCategoryProduct(
  //   @Param('id') id: string,
  //   @Param('productId') productId: string,
  // ) {
  //   return {
  //     message: `product ${productId} and ${id}`,
  //   };
  // }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
