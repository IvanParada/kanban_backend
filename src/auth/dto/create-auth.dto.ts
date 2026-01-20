import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
  })
  name: string;

  @IsString()
  @IsEmail()
  @MinLength(3)
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
    required: true,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    example: 'password',
    description: 'User password',
    required: true,
  })
  password: string;
}
