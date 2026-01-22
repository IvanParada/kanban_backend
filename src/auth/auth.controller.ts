import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { ApiWrappedResponse } from 'src/common/swagger/api-wrapped-response';
import { AuthResponseDto, LoginResponseDto } from './dto/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiWrappedResponse(AuthResponseDto, { description: 'User created' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.create(createUserDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('login')
  @ApiWrappedResponse(LoginResponseDto, { description: 'User logged in' })
  @ApiBadRequestResponse({ description: 'User not found' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('renew-token')
  @Auth()
  @ApiBearerAuth('access-token')
  @ApiWrappedResponse(AuthResponseDto, { description: 'User token renewed' })
  @ApiBadRequestResponse({ description: 'User not found' })
  renewToken(@GetUser() user: User) {
    return this.authService.renewToken(user);
  }
}
