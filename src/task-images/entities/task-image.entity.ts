import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'task_images' })
export class TaskImage {
  @ApiProperty({
    example: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
    description: 'Image id',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'users/a0ee.../tasks/e4f2.../uuid-captura_error.png',
    description: 'Image key',
    required: true,
  })
  @Column({ type: 'text' })
  key: string;

  @ApiProperty({
    example: 'image/png',
    description: 'Image mime type',
    required: true,
  })
  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @ApiProperty({
    example: 1024,
    description: 'Image size',
    required: true,
  })
  @Column({ type: 'int' })
  size: number;

  @ApiProperty({
    example: 'captura_error.png',
    description: 'Image original name',
    required: true,
  })
  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @ApiProperty({
    example: '2026-01-20T15:05:46.000Z',
    description: 'Image created at',
    required: true,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2026-01-20T15:05:46.000Z',
    description: 'Image updated at',
    required: true,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => Task,
    description: 'Image task',
    required: true,
  })
  @ManyToOne(() => Task, (task) => task.images, { onDelete: 'CASCADE' })
  task: Task;
}
