import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { StockDto } from './dto/stock.dto';
import { UpdateStockBulkDto } from './dto/update-stock-bulk.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export interface IStockQueryString {
  search: string;
}

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async findAllProductsStock(query: IStockQueryString): Promise<StockDto[]> {
    const search = query.search
      ? {
          $or: [{ name: { $regex: query.search, $options: 'i' } }, { sku: { $regex: query.search, $options: 'i' } }],
        }
      : {};

    const products = await this.productModel.find({ ...search }).exec();
    const productsStock = products.map((product) => {
      return {
        productId: product._id.toString(),
        productName: product.name,
        sku: product.sku,
        stock: product.stock,
      };
    });

    return productsStock;
  }

  async findById(id: string): Promise<StockDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The product with the provided id was not found');
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { productId: product._id.toString(), productName: product.name, sku: product.sku, stock: product.stock };
  }

  async updateProductsStockBulk(stockUpdates: UpdateStockBulkDto[]): Promise<void> {
    const bulkUpdateOperations = stockUpdates.map((update) => ({
      updateOne: {
        filter: { _id: update.productId },
        update: { $set: { stock: update.stock } },
      },
    }));

    await this.productModel.bulkWrite(bulkUpdateOperations);
  }

  async updateProductStock(id: string, product: UpdateStockDto): Promise<UpdateStockDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The product with the provided id was not found');
    }

    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  }
}
