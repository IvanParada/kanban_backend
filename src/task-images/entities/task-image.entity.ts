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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Task, (task) => task.images, { onDelete: 'CASCADE' })
  task: Task;
}
