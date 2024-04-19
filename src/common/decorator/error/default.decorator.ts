import { applyDecorators } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorDecorator } from './error.decorator';

export function DefaultErrorDecorator() {
  return applyDecorators(
    ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server', 'There was an internal server error'),
  );
}
