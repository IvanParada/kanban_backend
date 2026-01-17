import { v4 as uuid } from 'uuid';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

export enum TaskStatus {
  TODO = 'TODO',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 100,
    nullable: false,
  })
  title: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  state: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.task, { eager: true })
  user: User;
}
