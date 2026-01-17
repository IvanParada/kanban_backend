import { Task } from 'src/tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  name: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['USER_ROLE'],
  })
  role: string[];

  @OneToMany(() => Task, (task) => task.user)
  task: Task;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
