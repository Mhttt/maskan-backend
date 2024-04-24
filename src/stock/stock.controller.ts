import { Body, Controller, Get, HttpStatus, Put, Query, ValidationPipe } from '@nestjs/common';
import { BaseController } from 'src/common/util/base.controller';
import { IStockQueryString, StockService } from './stock.service';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { StockDto } from './dto/stock.dto';
import { SuccessDto } from 'src/common/dto/success.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiSuccessDecorator } from 'src/common/decorator/error/success.decorator';

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

  @Put()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update one or more products by id. Admins only',
  })
  @ApiBody({
    type: [UpdateStockDto],
  })
  @ApiSuccessDecorator(HttpStatus.OK, 'Products stock updated successfully')
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'Product not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid input')
  async updateProducts(
    @Body(ValidationPipe)
    products: UpdateStockDto[],
  ): Promise<SuccessDto> {
    await this.stockService.updateProductsStock(products);
    return {
      message: 'Products stock updated successfully',
      status_code: HttpStatus.OK,
    };
  }
}
