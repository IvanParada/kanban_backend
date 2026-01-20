import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { TaskImage } from 'src/task-images/entities/task-image.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'TODO',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ name: 'tasks' })
export class Task {
  @ApiProperty({
    example: 'e4f2b1a0-1234-4567-890a-bcdef1234567',
    description: 'Task id',
    required: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Reparar servidor',
    description: 'Task title',
    required: true,
  })
  @Column({
    length: 100,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    example: 'El servidor de producción tiene latencia alta',
    description: 'Task description',
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'TODO',
    description: 'Task state',
    required: true,
  })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  state: TaskStatus;

  @ApiProperty({
    example: '2026-01-20T15:05:46.000Z',
    description: 'Task created at',
    required: true,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2026-01-20T15:05:46.000Z',
    description: 'Task updated at',
    required: true,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: User,
    description: 'Task user',
    required: true,
  })
  @ManyToOne(() => User, (user) => user.task, { eager: true })
  user: User;

  @ApiProperty({
    type: () => TaskImage,
    isArray: true,
    description: 'Task images',
    required: true,
  })
  @OneToMany(() => TaskImage, (taskImage) => taskImage.task)
  images: TaskImage[];
}
