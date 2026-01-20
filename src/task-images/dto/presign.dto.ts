import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsArray } from 'class-validator';

class FileInfo {
  @ApiProperty({
    example: 'captura_error.png',
  })
  @IsString()
  filename: string;

  @ApiProperty({
    example: 'image/png',
  })
  @IsString()
  mimeType: string;
}

export class PresignDto {
  @ApiProperty({
    example: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
  })
  @IsString()
  taskId: string;

  @ApiProperty({
    type: () => FileInfo,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  files: FileInfo[];
}
