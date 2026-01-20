import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('tasks')
@Auth()
@ApiBearerAuth('access-token')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The task has been successfully created',
    example: {
      title: 'Reparar servidor',
      description: 'El servidor de producción tiene latencia alta',
      state: 'TODO',
      user: {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        email: 'ivan@example.com',
      },
      id: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
      createdAt: '2026-01-18T23:55:00.000Z',
      updatedAt: '2026-01-18T23:55:00.000Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'The task has not been created',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOkResponse({
    description: 'The tasks have been successfully retrieved',
    example: {
      tasks: [
        {
          title: 'Reparar servidor',
          description: 'El servidor de producción tiene latencia alta',
          state: 'TODO',
          user: {
            id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            email: 'ivan@example.com',
          },
          id: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
          createdAt: '2026-01-18T23:55:00.000Z',
          updatedAt: '2026-01-18T23:55:00.000Z',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The task has been successfully retrieved',
    example: {
      title: 'Reparar servidor',
      description: 'El servidor de producción tiene latencia alta',
      state: 'TODO',
      user: {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        email: 'ivan@example.com',
      },
      id: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
      createdAt: '2026-01-18T23:55:00.000Z',
      updatedAt: '2026-01-18T23:55:00.000Z',
      images: [
        {
          id: 'imagen-uuid-123',
          url: 'https://xyz.supabase.co/storage/v1/object/public/bucket/...',
          key: 'users/a0ee.../tasks/e4f2.../uuid-captura_error.png',
          mimeType: 'image/png',
          originalName: 'captura_error.png',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
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
  @ApiOkResponse({
    description: 'The task has been successfully updated',
    example: {
      title: 'Reparar servidor',
      description: 'El servidor de producción tiene latencia alta',
      state: 'TODO',
      user: {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        email: 'ivan@example.com',
      },
      id: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
      createdAt: '2026-01-18T23:55:00.000Z',
      updatedAt: '2026-01-18T23:55:00.000Z',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
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
  @ApiOkResponse({
    description: 'The task has been successfully deleted',
    example: {
      status: 'success',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
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
