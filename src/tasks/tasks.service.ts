import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreatedTaskResponseDto } from './dto/response/created-task-response.dto';
import { plainToInstance } from 'class-transformer';
import { GetTasksResponseDto } from './dto/response/get-tasks-response.dto';
import { GetTaskByIdResponseDto } from './dto/response/get-task-by-id.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<CreatedTaskResponseDto> {
    try {
      const task = this.taskRepository.create({ ...createTaskDto, user });
      const saved = await this.taskRepository.save(task);
      return plainToInstance(CreatedTaskResponseDto, saved);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(userId: string): Promise<GetTasksResponseDto[]> {
    const tasks = await this.taskRepository.find({
      where: { user: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });

    return plainToInstance(GetTasksResponseDto, tasks);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<GetTaskByIdResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
      select: { id: true },
      relations: { user: true, images: true },
    });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    this.taskRepository.merge(task, updateTaskDto);

    try {
      const saved = await this.taskRepository.save(task);
      const reloaded = await this.taskRepository.findOne({
        where: { id: saved.id, user: { id: userId } },
        relations: { user: true, images: true },
      });

      return plainToInstance(GetTaskByIdResponseDto, reloaded);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    const { affected } = await this.taskRepository.delete({
      id,
      user: { id: userId },
    });

    if (affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async findOne(
    id: string,
    userId: string,
    expiresIn: number = 21600,
  ): Promise<GetTaskByIdResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: { images: true, user: true },
    });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    const baseResponse = {
      id: task.id,
      title: task.title,
      description: task.description,
      state: task.state,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      user: {
        id: task.user.id,
        email: task.user.email,
      },
    };

    const images = task.images ?? [];
    if (images.length === 0)
      return plainToInstance(GetTaskByIdResponseDto, {
        ...baseResponse,
        images: [],
      });

    const signed = await Promise.all(
      task.images.map(async (img) => {
        const { data, error } = await this.supabaseService
          .storage()
          .createSignedUrl(img.key, expiresIn);

        if (error) throw error;

        return { id: img.id, signedUrl: data.signedUrl };
      }),
    );

    const map = new Map(signed.map((x) => [x.id, x.signedUrl]));

    return plainToInstance(GetTaskByIdResponseDto, {
      ...baseResponse,
      images: images.map((img) => ({
        id: img.id,
        key: img.key,
        mimeType: img.mimeType,
        originalName: img.originalName,
        signedUrl: map.get(img.id),
      })),
    });
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw error;
  }
}
