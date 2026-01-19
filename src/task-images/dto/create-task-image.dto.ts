import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ImageConfirmationDto {
  @IsString()
  key: string;

  @IsString()
  url: string;

  @IsString()
  mimeType: string;

  @IsNumber()
  size: number;

  @IsString()
  originalName: string;
}

export class CreateTaskImageDto {
  @IsString()
  @IsUUID()
  taskId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageConfirmationDto)
  images: ImageConfirmationDto[];
}
