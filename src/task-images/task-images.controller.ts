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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PresignDto } from './dto/presign.dto';

@Controller('task-images')
export class TaskImagesController {
  constructor(private readonly taskImagesService: TaskImagesService) {}

  @Post('presign')
  @Auth()
  presign(@Body() dto: PresignDto, @GetUser() user: User) {
    return this.taskImagesService.presign(dto, user.id);
  }

  @Post(':taskId')
  @Auth()
  async createTaskImage(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() createTaskImageDto: CreateTaskImageDto,
    @GetUser() user: User,
  ) {
    return this.taskImagesService.createTaskImage(
      taskId,
      createTaskImageDto,
      user.id,
    );
  }

  @Get(':id/signed-url')
  @Auth()
  getSignedUrl(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Query('expiresIn') expiresIn?: string,
  ) {
    const exp = expiresIn ? parseInt(expiresIn, 10) : 21600; // 6h
    return this.taskImagesService.getSignedUrl(id, user.id, exp);
  }
}
