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
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiWrappedResponse } from 'src/common/swagger/api-wrapped-response';
import {
  ConfirmResponseDto,
  PresignResponseDto,
  SignResponseDto,
} from './dto/response';

@Controller('task-images')
@Auth()
@ApiBearerAuth('access-token')
export class TaskImagesController {
  constructor(private readonly taskImagesService: TaskImagesService) {}

  @ApiWrappedResponse(PresignResponseDto, { description: 'Image Presigned' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('presign')
  presign(@Body() dto: PresignDto, @GetUser() user: User) {
    return this.taskImagesService.presign(dto, user.id);
  }

  @Post('confirm')
  @ApiWrappedResponse(ConfirmResponseDto, { description: 'Image confirmed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async confirm(@Body() dto: CreateTaskImageDto, @GetUser() user: User) {
    return this.taskImagesService.confirm(dto, user.id);
  }

  @Get(':imageId/signed-url')
  @ApiWrappedResponse(SignResponseDto, { description: 'Image signed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
