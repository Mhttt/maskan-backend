import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/util/base.controller';
import { IProductQueryString, ProductService } from './product.service';
import { Roles } from 'src/common/decorator/error/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';
import { Product } from './schemas/product.schema';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
@ApiTags('Products')
@Controller('products')
export class ProductController extends BaseController {
  constructor(private productService: ProductService) {
    super();
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Products. Allows search as param for searching, or page as param for pagination. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [Product] })
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unathorized', 'Not authorized')
  async getAllProducts(@Query() query: IProductQueryString): Promise<Product[]> {
    return this.productService.findAll(query);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a product. Admins only',
  })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Product })
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid Product input')
  async createProduct(
    @Body(ValidationPipe)
    product: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(product);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a single product by id. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The product with the provided id was not found')
  async getProductById(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single product by id. Admins only',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateProductDto })
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'The product with the provided id was not found')
  @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request', 'Invalid product input')
  async updateProduct(
    @Param('id')
    id: string,
    @Body(ValidationPipe)
    product: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    return this.productService.updateById(id, product);
  }
}
