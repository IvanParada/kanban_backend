import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '049ab96e-aba5-4972-a71f-dc7693078778',
    description: 'User id',
    required: true,
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin@kanban.cl',
    description: 'User email',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Kanban Admin',
    description: 'User name',
    required: true,
  })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'User is active',
    required: true,
  })
  isActive: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example: ['USER_ROLE'],
    description: 'User roles',
    required: true,
  })
  role: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OWFiOTZlLWFiYTUtNDk3Mi1hNzFmLWRjNzY5MzA3ODc3OCIsImlhdCI6MTc2ODkzNDUyMSwiZXhwIjoxNzY4OTQxNzIxfQ.RcQSGBOPJHmuMv_gffznabQMsVVQx-YSYptI2buwvhI',
    description: 'User token',
    required: true,
  })
  token: string;
}
