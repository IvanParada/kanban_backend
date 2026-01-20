import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Reparar servidor',
    description: 'Task title',
    required: true,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'El servidor de producción tiene latencia alta',
    description: 'Task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'TODO',
    description: 'Task state',
    required: true,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  state: TaskStatus;
}
