import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';
import { UserSummaryDto } from 'src/auth/dto/response/user-summary.dto';

export class CreatedTaskResponseDto {
  @ApiProperty({ example: '9c1c6c79-450b-461f-8d6e-411cade00177' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Create Task' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Test different services' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'TODO' })
  @IsString()
  state: string;

  @ApiProperty({ example: '2026-01-20T22:14:16.045Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2026-01-20T22:14:16.045Z' })
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ type: UserSummaryDto })
  @Type(() => UserSummaryDto)
  user: UserSummaryDto;
}
