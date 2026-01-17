import { IsString } from 'class-validator';

export class PresignDto {
  @IsString()
  taskId: string;

  @IsString()
  filename: string;

  @IsString()
  mimeType: string;
}
