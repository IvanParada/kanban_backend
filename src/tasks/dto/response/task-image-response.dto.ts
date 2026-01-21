import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class TaskImageResponseDto {
  @ApiProperty({ example: 'imagen-uuid-123' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'https://xyz.supabase.co/storage/v1/object/public/bucket/...',
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: 'users/a0ee.../tasks/e4f2.../uuid-captura_error.png',
  })
  @IsString()
  key: string;

  @ApiProperty({ example: 'image/png' })
  @IsString()
  mimeType: string;

  @ApiProperty({ example: 'captura_error.png' })
  @IsString()
  originalName: string;
}
