import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { SuccessDto } from 'src/common/dto/success.dto';
export function ApiSuccessDecorator(
  statusCode: HttpStatus,
  message: string,
  description?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: description,
      schema: {
        default: {
          message: message,
          status_code: statusCode,
        },
        type: getSchemaPath(SuccessDto),
      },
    }),
  );
}
