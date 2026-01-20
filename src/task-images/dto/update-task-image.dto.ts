import { PartialType } from '@nestjs/swagger';
import { CreateTaskImageDto } from './create-task-image.dto';

export class UpdateTaskImageDto extends PartialType(CreateTaskImageDto) {}
