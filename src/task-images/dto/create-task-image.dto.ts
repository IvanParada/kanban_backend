import { IsInt, IsString, Min } from 'class-validator';

export class CreateTaskImageDto {
  @IsString()
  key: string;

  @IsString()
  url: string;

  @IsString()
  mimeType: string;

  @IsInt()
  @Min(1)
  size: number;

  @IsString()
  originalName: string;
}
