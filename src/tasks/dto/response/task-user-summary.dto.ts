import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class TaskUserSummaryDto {
  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ format: 'email', example: 'admin@kanban.com' })
  @IsString()
  @IsEmail()
  email: string;
}
