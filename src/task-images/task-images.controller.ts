import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TaskImagesService } from './task-images.service';
import { CreateTaskImageDto } from './dto/create-task-image.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PresignDto } from './dto/presign.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('task-images')
@Auth()
@ApiBearerAuth('access-token')
export class TaskImagesController {
  constructor(private readonly taskImagesService: TaskImagesService) {}
  //TODO: Create and Implement ResponsesDto

  @ApiCreatedResponse({
    description: 'The task image has been successfully presigned',
    example: {
      status: 'success',
      data: [
        {
          signedUrl:
            'https://uaxvdvuuuzlzvmdngrvx.supabase.co/storage/v1/object/upload/sign/task-images/users/7293f67f-da61-4ba6-acaa-eaa6a889606b/tasks/14738eb3-4635-41b4-9e6b-6df41a3b1de7/63fa5b9e-d958-421c-89e8-d6c47ac828bc-captura_error.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQwOWI4MS0xODYwLTQxN2EtOTBmNi0wN2I0YzdlZjYzNjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0YXNrLWltYWdlcy91c2Vycy83MjkzZjY3Zi1kYTYxLTRiYTYtYWNhYS1lYWE2YTg4OTYwNmIvdGFza3MvMTQ3MzhlYjMtNDYzNS00MWI0LTllNmItNmRmNDFhM2IxZGU3LzYzZmE1YjllLWQ5NTgtNDIxYy04OWU4LWQ2YzQ3YWM4MjhiYy1jYXB0dXJhX2Vycm9yLnBuZyIsInVwc2VydCI6ZmFsc2UsImlhdCI6MTc2ODkzMTIwNCwiZXhwIjoxNzY4OTM4NDA0fQ.lyvkwKIvgfjhYrQxQDn1waHgxdkquwsNciY24B2IJLE',
          path: 'users/7293f67f-da61-4ba6-acaa-eaa6a889606b/tasks/14738eb3-4635-41b4-9e6b-6df41a3b1de7/63fa5b9e-d958-421c-89e8-d6c47ac828bc-captura_error.png',
          token:
            'eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQwOWI4MS0xODYwLTQxN2EtOTBmNi0wN2I0YzdlZjYzNjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0YXNrLWltYWdlcy91c2Vycy83MjkzZjY3Zi1kYTYxLTRiYTYtYWNhYS1lYWE2YTg4OTYwNmIvdGFza3MvMTQ3MzhlYjMtNDYzNS00MWI0LTllNmItNmRmNDFhM2IxZGU3LzYzZmE1YjllLWQ5NTgtNDIxYy04OWU4LWQ2YzQ3YWM4MjhiYy1jYXB0dXJhX2Vycm9yLnBuZyIsInVwc2VydCI6ZmFsc2UsImlhdCI6MTc2ODkzMTIwNCwiZXhwIjoxNzY4OTM4NDA0fQ.lyvkwKIvgfjhYrQxQDn1waHgxdkquwsNciY24B2IJLE',
          originalName: 'captura_error.png',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('presign')
  presign(@Body() dto: PresignDto, @GetUser() user: User) {
    return this.taskImagesService.presign(dto, user.id);
  }

  @Post('confirm')
  @ApiCreatedResponse({
    description: 'The task image has been successfully confirmed',
    example: {
      status: 'success',
      data: [
        {
          id: 'c3ef910a-535b-4b55-a754-dabce1c8f729',
          key: 'users/049ab96e-aba5-4972-a71f-dc7693078778/tasks/9c1c6c79-450b-461f-8d6e-411cade00177/6a4f94b1-9196-4708-8d68-0f17e8347854-captura_error.png',
          mimeType: 'image/png',
          size: 10240,
          originalName: 'captura_error.png',
          createdAt: '2026-01-20T22:16:56.327Z',
          updatedAt: '2026-01-20T22:16:56.327Z',
          task: {
            id: '9c1c6c79-450b-461f-8d6e-411cade00177',
            title: 'Create Task',
            description: 'Test different services',
            state: 'TODO',
            createdAt: '2026-01-20T22:14:16.045Z',
            updatedAt: '2026-01-20T22:14:16.045Z',
            user: {
              id: '049ab96e-aba5-4972-a71f-dc7693078778',
              email: 'admin@kanban.cl',
              name: 'Kanban Admin',
              isActive: true,
              role: ['USER_ROLE'],
            },
          },
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async confirm(@Body() dto: CreateTaskImageDto, @GetUser() user: User) {
    return this.taskImagesService.confirm(dto, user.id);
  }

  @Get(':imageId/signed-url')
  @ApiOkResponse({
    description: 'The task image has been successfully confirmed',
    example: {
      status: 'success',
      data: {
        id: 'c3ef910a-535b-4b55-a754-dabce1c8f729',
        signedUrl:
          'https://uaxvdvuuuzlzvmdngrvx.supabase.co/storage/v1/object/sign/task-images/users/049ab96e-aba5-4972-a71f-dc7693078778/tasks/9c1c6c79-450b-461f-8d6e-411cade00177/6a4f94b1-9196-4708-8d68-0f17e8347854-captura_error.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQwOWI4MS0xODYwLTQxN2EtOTBmNi0wN2I0YzdlZjYzNjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0YXNrLWltYWdlcy91c2Vycy8wNDlhYjk2ZS1hYmE1LTQ5NzItYTcxZi1kYzc2OTMwNzg3NzgvdGFza3MvOWMxYzZjNzktNDUwYi00NjFmLThkNmUtNDExY2FkZTAwMTc3LzZhNGY5NGIxLTkxOTYtNDcwOC04ZDY4LTBmMTdlODM0Nzg1NC1jYXB0dXJhX2Vycm9yLnBuZyIsImlhdCI6MTc2ODkzNjY3MiwiZXhwIjoxNzY4OTM2OTcyfQ.dqkIVzieYms6qk1BWaPRpG0VEfeoBeTqcBYKa8USFEw',
        expiresIn: 300,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiParam({
    name: 'imageId',
    format: 'uuid',
    description: 'Task image ID',
    required: true,
  })
  @ApiQuery({
    name: 'expiresIn',
    required: false,
    description:
      'Expiration time in seconds for the signed URL. If omitted, the server default is used.',
    schema: {
      type: 'integer',
      example: 300,
    },
  })
  refreshSignedUrl(
    @Param('imageId', ParseUUIDPipe) imageId: string,
    @GetUser() user: User,
    @Query('expiresIn') expiresIn?: string,
  ) {
    const exp = expiresIn ? Number(expiresIn) : undefined;
    return this.taskImagesService.refreshSignedUrl(imageId, user.id, exp);
  }
}
