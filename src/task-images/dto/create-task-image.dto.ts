import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ImageConfirmationDto {
  @ApiProperty({
    example: 'users/a0ee.../tasks/e4f2.../uuid-captura_error.png',
    description: 'Image key',
    required: true,
  })
  @IsString()
  key: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'Image url',
    required: true,
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: 'image/png',
    description: 'Image mime type',
    required: true,
  })
  @IsString()
  mimeType: string;

  @ApiProperty({
    example: 1024,
    description: 'Image size',
    required: true,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    example: 'captura_error.png',
    description: 'Image original name',
    required: true,
  })
  @IsString()
  originalName: string;
}

export class CreateTaskImageDto {
  @ApiProperty({
    example: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
    description: 'Task id',
    required: true,
  })
  @IsString()
  @IsUUID()
  taskId: string;

  @ApiProperty({
    example: [
      {
        key: 'users/a0ee.../tasks/e4f2.../uuid-captura_error.png',
        url: 'https://example.com/image.png',
        mimeType: 'image/png',
        size: 1024,
        originalName: 'captura_error.png',
      },
    ],
    description: 'Images',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageConfirmationDto)
  images: ImageConfirmationDto[];
}
