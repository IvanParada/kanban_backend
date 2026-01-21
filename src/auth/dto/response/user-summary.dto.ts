import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UserSummaryDto {
  @ApiProperty({ example: '049ab96e-aba5-4972-a71f-dc7693078778' })
  @IsString()
  id: string;
  @ApiProperty({ example: 'admin@kanban.cl' })
  @IsString()
  email: string;
  @ApiProperty({ example: 'Kanban Admin' })
  @IsString()
  name: string;
  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
  @ApiProperty({ example: ['USER_ROLE'] })
  @IsString({ each: true })
  role: string[];
}
