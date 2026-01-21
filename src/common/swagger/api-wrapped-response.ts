import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';

export function ApiWrappedResponse<TModel extends Type<any>>(
  model: TModel,
  description = '',
) {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto, model),
    ApiCreatedResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
}
