import { ApiProperty } from '@nestjs/swagger';
import { TaskListItemDto } from './task-list-response.dto';

export class GetTasksResponseDto {
  @ApiProperty({ type: () => [TaskListItemDto] })
  tasks: TaskListItemDto[];
}
