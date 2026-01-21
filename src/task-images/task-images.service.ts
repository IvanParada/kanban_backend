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
import { PresignResponseDto } from './dto/response/presign-response.dto';

@Injectable()
export class TaskImagesService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskImage)
    private readonly taskImageRepository: Repository<TaskImage>,
    private readonly supabase: SupabaseService,
  ) {}

  async presign(
    dto: PresignDto,
    userId: string,
  ): Promise<PresignResponseDto[]> {
    await this.getOwnedTask(dto.taskId, userId);

    const checkMime = dto.files.every((f) => f.mimeType.startsWith('image/'));
    if (!checkMime) {
      throw new ForbiddenException('Solo se permiten imágenes');
    }

    return Promise.all(
      dto.files.map(async (f) => {
        const safeName = f.filename.replace(/[^\w.\-]/g, '_');
        const path = `users/${userId}/tasks/${dto.taskId}/${uuid()}-${safeName}`;

        const { data, error } = await this.supabase
          .storage()
          .createSignedUploadUrl(path);

        if (error) throw error;
        return {
          signedUrl: data.signedUrl,
          path,
          token: data.token,
          originalName: f.filename,
        };
      }),
    );
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

  async confirm(dto: CreateTaskImageDto, userId: string) {
    const task = await this.getOwnedTask(dto.taskId, userId);
    const entities = dto.images.map((img) =>
      this.taskImageRepository.create({
        ...img,
        task,
      }),
    );

    return this.taskImageRepository.save(entities);
  }

  async refreshSignedUrl(imageId: string, userId: string, expiresIn = 60 * 5) {
    const img = await this.taskImageRepository.findOne({
      where: { id: imageId },
      relations: { task: { user: true } },
    });

    if (!img) throw new NotFoundException('Image not found');

    if (img.task.user.id !== userId) {
      throw new NotFoundException('Image not found');
    }

    const { data, error } = await this.supabase
      .storage()
      .createSignedUrl(img.key, expiresIn);

    if (error) throw error;

    return { id: img.id, signedUrl: data.signedUrl, expiresIn };
  }
}
