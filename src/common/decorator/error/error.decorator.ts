import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ErrorDto } from 'src/common/dto/error.dto';
export function ApiErrorDecorator(
  statusCode: HttpStatus,
  error: string,
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
          error: error,
          status_code: statusCode,
          message: message,
        },
        type: getSchemaPath(ErrorDto),
      },
    }),
  );
}
