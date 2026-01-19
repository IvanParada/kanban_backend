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

@Controller('task-images')
@Auth()
export class TaskImagesController {
  constructor(private readonly taskImagesService: TaskImagesService) {}

  @Post('presign')
  presign(@Body() dto: PresignDto, @GetUser() user: User) {
    return this.taskImagesService.presign(dto, user.id);
  }

  @Post('confirm')
  async confirm(@Body() dto: CreateTaskImageDto, @GetUser() user: User) {
    return this.taskImagesService.confirm(dto, user.id);
  }
}
