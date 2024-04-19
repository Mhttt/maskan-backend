import { Controller } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorDecorator } from '../decorator/error/error.decorator';

@Controller()
@ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error')
export class BaseController {}
