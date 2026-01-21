import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiWrappedResponse } from 'src/common/swagger/api-wrapped-response';
import {
  CreatedTaskResponseDto,
  GetTaskByIdResponseDto,
  GetTasksResponseDto,
} from './dto/response';

@Controller('tasks')
@Auth()
@ApiBearerAuth('access-token')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiWrappedResponse(CreatedTaskResponseDto, { description: 'Task Created' })
  @ApiBadRequestResponse({ description: 'The task has not been created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiWrappedResponse(GetTasksResponseDto, { description: 'Task Listed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  @ApiWrappedResponse(GetTaskByIdResponseDto, { description: 'Task By Id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Task ID',
    required: true,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user.id, 21600);
  }

  @Patch(':id')
  @ApiWrappedResponse(GetTaskByIdResponseDto, { description: 'Task Updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Task ID',
    required: true,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @ApiWrappedResponse(null, { description: 'Task Deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Task ID',
    required: true,
  })
  async remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    await this.tasksService.remove(id, user.id);
    return {
      status: 'success',
    };
  }
}
