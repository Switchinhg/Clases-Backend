import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findOne(id: string): Promise<Product> {
    return this.products.find((product) => product.id == id);
  }

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async update(id: string, product: Product): Promise<Product> {
    const index = this.products.findIndex((product) => product.id == id);
    this.products[index] = product;
    return product;
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex((product) => product.id == id);
    this.products.splice(index, 1);
  }
}
