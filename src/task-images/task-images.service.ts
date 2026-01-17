import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskImageDto } from './dto/create-task-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TaskImage } from './entities/task-image.entity';
import { PresignDto } from './dto/presign.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskImagesService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskImage)
    private readonly taskImageRepository: Repository<TaskImage>,
    private readonly supabase: SupabaseService,
  ) {}

  async presign(dto: PresignDto, userId: string) {
    await this.getOwnedTask(dto.taskId, userId);

    if (!dto.mimeType.startsWith('image/')) {
      throw new ForbiddenException('Solo se permiten imágenes');
    }

    const safeName = dto.filename.replace(/[^\w.\-]/g, '_');
    const path = `users/${userId}/tasks/${dto.taskId}/${uuid()}-${safeName}`;

    const { data, error } = await this.supabase
      .storage()
      .createSignedUploadUrl(path);

    if (error) throw error;

    // data: { signedUrl, path, token }
    return data;
  }

  private async getOwnedTask(taskId: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: { user: true },
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== userId) throw new NotFoundException('Task not found');
    return task;
  }

  async createTaskImage(
    taskId: string,
    createTaskImageDto: CreateTaskImageDto,
    userId: string,
  ) {
    const task = await this.getOwnedTask(taskId, userId);
    const taskImage = this.taskImageRepository.create({
      ...createTaskImageDto,
      task,
    });

    return this.taskImageRepository.save(taskImage);
  }

  async getSignedUrl(imageId: string, userId: string, expiresIn = 21600) {
    const img = await this.taskImageRepository.findOne({
      where: { id: imageId },
      relations: { task: { user: true } },
    });

    if (!img) throw new NotFoundException('Imagen no encontrada');
    if (img.task.user.id !== userId)
      throw new ForbiddenException('No es tu imagen');

    const { data, error } = await this.supabase
      .storage()
      .createSignedUrl(img.key, expiresIn);

    if (error) throw error;

    return { signedUrl: data.signedUrl, expiresIn };
  }
}
