import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PresignResponseDto {
  @ApiProperty({
    example:
      'https://uaxvdvuuuzlzvmdngrvx.supabase.co/storage/v1/object/upload/sign/task-images/users/7293f67f-da61-4ba6-acaa-eaa6a889606b/tasks/14738eb3-4635-41b4-9e6b-6df41a3b1de7/63fa5b9e-d958-421c-89e8-d6c47ac828bc-captura_error.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQwOWI4MS0xODYwLTQxN2EtOTBmNi0wN2I0YzdlZjYzNjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0YXNrLWltYWdlcy91c2Vycy83MjkzZjY3Zi1kYTYxLTRiYTYtYWNhYS1lYWE2YTg4OTYwNmIvdGFza3MvMTQ3MzhlYjMtNDYzNS00MWI0LTllNmItNmRmNDFhM2IxZGU3LzYzZmE1YjllLWQ5NTgtNDIxYy04OWU4LWQ2YzQ3YWM4MjhiYy1jYXB0dXJhX2Vycm9yLnBuZyIsInVwc2VydCI6ZmFsc2UsImlhdCI6MTc2ODkzMTIwNCwiZXhwIjoxNzY4OTM4NDA0fQ.lyvkwKIvgfjhYrQxQDn1waHgxdkquwsNciY24B2IJLE',
  })
  @IsString()
  signedUrl: string;

  @ApiProperty({
    example:
      'users/7293f67f-da61-4ba6-acaa-eaa6a889606b/tasks/14738eb3-4635-41b4-9e6b-6df41a3b1de7/63fa5b9e-d958-421c-89e8-d6c47ac828bc-captura_error.png',
  })
  @IsString()
  path: string;

  @ApiProperty({
    example:
      'eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQwOWI4MS0xODYwLTQxN2EtOTBmNi0wN2I0YzdlZjYzNjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0YXNrLWltYWdlcy91c2Vycy83MjkzZjY3Zi1kYTYxLTRiYTYtYWNhYS1lYWE2YTg4OTYwNmIvdGFza3MvMTQ3MzhlYjMtNDYzNS00MWI0LTllNmItNmRmNDFhM2IxZGU3LzYzZmE1YjllLWQ5NTgtNDIxYy04OWU4LWQ2YzQ3YWM4MjhiYy1jYXB0dXJhX2Vycm9yLnBuZyIsInVwc2VydCI6ZmFsc2UsImlhdCI6MTc2ODkzMTIwNCwiZXhwIjoxNzY4OTM4NDA0fQ.lyvkwKIvgfjhYrQxQDn1waHgxdkquwsNciY24B2IJLE',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'captura_error.png',
  })
  @IsString()
  originalName: string;
}
