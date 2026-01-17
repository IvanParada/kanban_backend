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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    try {
      const task = this.taskRepository.create({ ...createTaskDto, user });
      return await this.taskRepository.save(task);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(userId: string) {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const taskExists = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
      select: { id: true },
    });

    if (!taskExists) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    try {
      return await this.taskRepository.save(task);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, userId: string) {
    const { affected } = await this.taskRepository.delete({
      id,
      user: { id: userId },
    });

    if (affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async findOne(id: string, userId: string, expiresIn: number = 21600) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: { images: true, user: true },
    });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    if (!task.images?.length) return task;

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

    task.images = task.images.map((img: any) => ({
      ...img,
      signedUrl: map.get(img.id),
    }));

    return task;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw error;
  }
}
