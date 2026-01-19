import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsArray } from 'class-validator';

class FileInfo {
  @IsString()
  filename: string;

  @IsString()
  mimeType: string;
}

export class PresignDto {
  @IsString()
  taskId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  files: FileInfo[];
}
