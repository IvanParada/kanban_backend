import { CreatedTaskResponseDto } from 'src/tasks/dto/response/created-task-response.dto';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmResponseDto {
  @ApiProperty({
    example: 'c3ef910a-535b-4b55-a754-dabce1c8f729',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    example:
      'users/049ab96e-aba5-4972-a71f-dc7693078778/tasks/9c1c6c79-450b-461f-8d6e-411cade00177/6a4f94b1-9196-4708-8d68-0f17e8347854-captura_error.png',
  })
  @IsString()
  key: string;

  @ApiProperty({
    example: 'image/png',
  })
  @IsString()
  mimeType: string;

  @ApiProperty({
    example: 10240,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    example: 'captura_error.png',
  })
  @IsString()
  originalName: string;

  @ApiProperty({
    example: '2026-01-20T22:16:56.327Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    example: '2026-01-20T22:16:56.327Z',
  })
  @IsDateString()
  updatedAt: string;

  @ApiProperty({
    type: CreatedTaskResponseDto,
  })
  @Type(() => CreatedTaskResponseDto)
  task: CreatedTaskResponseDto;
}
