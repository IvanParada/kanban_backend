import { Module } from '@nestjs/common';
import { TaskImagesService } from './task-images.service';
import { TaskImagesController } from './task-images.controller';
import { TaskImage } from './entities/task-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskImage]),
    SupabaseModule,
    AuthModule,
  ],
  controllers: [TaskImagesController],
  providers: [TaskImagesService],
})
export class TaskImagesModule {}
