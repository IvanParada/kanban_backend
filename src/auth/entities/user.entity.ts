import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
    required: true,
  })
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
    required: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty({
    example: 'password',
    description: 'User password',
    required: true,
  })
  password: string;

  @Column('text')
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
  })
  name: string;

  @Column('bool', {
    default: true,
  })
  @ApiProperty({
    example: true,
    description: 'User is active',
    required: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['USER_ROLE'],
  })
  @ApiProperty({
    example: ['USER_ROLE', 'ADMIN_ROLE'],
    description: 'User role',
    required: true,
  })
  role: string[];

  @ApiProperty({
    type: () => Task,
    description: 'User tasks',
  })
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
