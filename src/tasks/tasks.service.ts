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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    try {
      const task = this.taskRepository.create({ ...createTaskDto, user });
      return await this.taskRepository.save(task);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
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

  async remove(id: string) {
    const { affected } = await this.taskRepository.delete({ id });

    if (affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw error;
  }
}
