import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class SignResponseDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    example: 'c3ef910a-535b-4b55-a754-dabce1c8f729',
  })
  id: string;

  @IsString()
  @ApiProperty({
    example:
      'https://uaxvdvuuuzlzvmdngrvx.supabase.co/storage/v1/object/sign/task-images/users/049ab96e-aba5-4972-a71f-dc7693078778/tasks/9c1c6c79-450b-461f-8d6e-411cade00177/6a4f94b1-9196-4708-8d68-0f17e8347854-captura_error.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQwOWI4MS0xODYwLTQxN2EtOTBmNi0wN2I0YzdlZjYzNjIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0YXNrLWltYWdlcy91c2Vycy8wNDlhYjk2ZS1hYmE1LTQ5NzItYTcxZi1kYzc2OTMwNzg3NzgvdGFza3MvOWMxYzZjNzktNDUwYi00NjFmLThkNmUtNDExY2FkZTAwMTc3LzZhNGY5NGIxLTkxOTYtNDcwOC04ZDY4LTBmMTdlODM0Nzg1NC1jYXB0dXJhX2Vycm9yLnBuZyIsImlhdCI6MTc2ODkzNjY3MiwiZXhwIjoxNzY4OTM2OTcyfQ.dqkIVzieYms6qk1BWaPRpG0VEfeoBeTqcBYKa8USFEw',
  })
  signedUrl: string;

  @IsNumber()
  @ApiProperty({
    example: 300,
  })
  expiresIn: number;
}
