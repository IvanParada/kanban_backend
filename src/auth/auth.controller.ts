import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: Create and Implement ResponsesDto
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User created',
    example: {
      status: 'success',
      data: {
        id: '049ab96e-aba5-4972-a71f-dc7693078778',
        email: 'admin@kanban.cl',
        name: 'Kanban Admin',
        isActive: true,
        role: ['USER_ROLE'],
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OWFiOTZlLWFiYTUtNDk3Mi1hNzFmLWRjNzY5MzA3ODc3OCIsImlhdCI6MTc2ODkzNDUyMSwiZXhwIjoxNzY4OTQxNzIxfQ.RcQSGBOPJHmuMv_gffznabQMsVVQx-YSYptI2buwvhI',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    example: {
      status: 'success',
      data: {
        id: '049ab96e-aba5-4972-a71f-dc7693078778',
        email: 'admin@kanban.cl',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OWFiOTZlLWFiYTUtNDk3Mi1hNzFmLWRjNzY5MzA3ODc3OCIsImlhdCI6MTc2ODkzNDU1MiwiZXhwIjoxNzY4OTQxNzUyfQ.0W2i2Mzn2uktKG3cqM0xwMKwcZk4yvwZlSPuiDL1MBs',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'User not found',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('renew-token')
  @Auth()
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'User token renewed',
    example: {
      status: 'success',
      data: {
        id: '049ab96e-aba5-4972-a71f-dc7693078778',
        email: 'admin@kanban.cl',
        name: 'Kanban Admin',
        isActive: true,
        role: ['USER_ROLE'],
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0OWFiOTZlLWFiYTUtNDk3Mi1hNzFmLWRjNzY5MzA3ODc3OCIsImlhdCI6MTc2ODkzNTAxMCwiZXhwIjoxNzY4OTQyMjEwfQ.e4UgO1G3hpenqkV-0QZ0ANzCo3N-tRh3LiWFMGwuIMU',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'User not found',
  })
  renewToken(@GetUser() user: User) {
    return this.authService.renewToken(user);
  }
}
