import { ApiProperty } from '@nestjs/swagger';
import { TaskUserSummaryDto } from './task-user-summary.dto';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class TaskListItemDto {
  @ApiProperty({ example: 'Reparar servidor' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'El servidor de producción tiene latencia alta' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'TODO' })
  @IsString()
  state: string;

  @ApiProperty({ type: () => TaskUserSummaryDto })
  user: TaskUserSummaryDto;

  @ApiProperty({
    format: 'uuid',
    example: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ format: 'date-time', example: '2026-01-18T23:55:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ format: 'date-time', example: '2026-01-18T23:55:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}
