import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
