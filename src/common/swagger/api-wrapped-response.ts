import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';

export function ApiWrappedResponse(
  model: Type<any> | null,
  options?: { status?: number; description?: string; isArray?: boolean },
) {
  const status = options?.status ?? 200;
  const description = options?.description ?? '';
  const isArray = options?.isArray ?? false;

  const dataSchema =
    model === null
      ? { type: 'null', nullable: true }
      : isArray
        ? { type: 'array', items: { $ref: getSchemaPath(model) } }
        : { $ref: getSchemaPath(model) };

  const decorators = [
    ApiExtraModels(ApiResponseDto, ...(model ? [model] : [])),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: dataSchema,
            },
          },
        ],
      },
    }),
  ];

  return applyDecorators(...decorators);
}
