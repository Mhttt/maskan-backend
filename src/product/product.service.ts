import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

export interface IProductQueryString {
  search: string;
  page: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async findAll(query: IProductQueryString): Promise<Product[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const search = query.search
      ? {
          $or: [{ name: { $regex: query.search, $options: 'i' } }, { sku: { $regex: query.search, $options: 'i' } }],
        }
      : {};

    const products = await this.productModel
      .find({ ...search })
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return products;
  }
}
