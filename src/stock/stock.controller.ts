import { Body, Controller, Get, HttpStatus, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { BaseController } from 'src/common/util/base.controller';
import { IStockQueryString, StockService } from './stock.service';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { StockDto } from './dto/stock.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { UpdateStockBulkDto } from './dto/update-stock-bulk.dto';
import { ApiSuccessDecorator } from 'src/common/decorator/error/success.decorator';
import { UpdateStockDto } from './dto/update-stock.dto';

@ApiTags('Stock')
@Controller('stock')
export class StockController extends BaseController {
  constructor(private stockService: StockService) {
    super();
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all stock info of all products. Allows search as param for searching. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [StockDto] })
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unathorized', 'Not authorized')
  async getAllProductsStock(@Query() query: IStockQueryString): Promise<StockDto[]> {
    return this.stockService.findAllProductsStock(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get stock status of product by id. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: StockDto })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The product with the provided id was not found')
  async getStockById(
    @Param('id')
    id: string,
  ): Promise<StockDto> {
    return this.stockService.findById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update stock of a single product by id. Admins only',
  })
  @ApiSuccessDecorator(HttpStatus.OK, 'Product stock updated successfully')
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The product with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid product input')
  async updateStockProduct(
    @Param('id')
    id: string,
    @Body(ValidationPipe)
    product: UpdateStockDto,
  ): Promise<SuccessDto> {
    await this.stockService.updateProductStock(id, product);
    return {
      message: 'Product stock updated successfully',
      status_code: HttpStatus.OK,
    };
  }

  @Put()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update one or more products by id. Admins only',
  })
  @ApiBody({
    type: [UpdateStockBulkDto],
  })
  @ApiSuccessDecorator(HttpStatus.OK, 'Products stock updated successfully')
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'Product not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid input')
  async updateStockProducts(
    @Body(ValidationPipe)
    products: UpdateStockBulkDto[],
  ): Promise<SuccessDto> {
    await this.stockService.updateProductsStockBulk(products);
    return {
      message: 'Products stock updated successfully',
      status_code: HttpStatus.OK,
    };
  }
}
