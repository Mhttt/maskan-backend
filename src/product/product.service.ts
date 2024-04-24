import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
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

  async createProduct(product: CreateProductDto): Promise<Product> {
    const exists = await this.productModel.exists({ name: product.name.toLowerCase() });
    if (exists) {
      throw new ConflictException(`Product with name ${product.name} already exist`);
    }

    try {
      const newProduct = await new this.productModel(product);
      return newProduct.save();
    } catch (error) {
      throw new ConflictException('Error creating prouduct');
    }
  }

  async findById(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The product with the provided id was not found');
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateById(id: string, product: UpdateProductDto): Promise<UpdateProductDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The product with the provided id was not found');
    }

    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The product with the provided id was not found');
    }

    return await this.productModel.findByIdAndDelete(id);
  }
}
