import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
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
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OWFiOTZlLWFiYTUtNDk3Mi1hNzFmLWRjNzY5MzA3ODc3OCIsImlhdCI6MTc2ODkzNDU1MiwiZXhwIjoxNzY4OTQxNzUyfQ.0W2i2Mzn2uktKG3cqM0xwMKwcZk4yvwZlSPuiDL1MBs',
    description: 'User token',
    required: true,
  })
  token: string;
}
