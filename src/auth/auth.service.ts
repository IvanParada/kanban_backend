import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;

      const user = this.userRepository.create({
        ...rest,
        password: await bcrypt.hash(password, 10),
      });

      const saved = await this.userRepository.save(user);
      const { password: _, ...result } = saved;
      return {
        ...result,
        token: this.getJwtToken({ id: result.id }),
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) throw new UnauthorizedException('User not found');

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...result } = user;
    return {
      ...result,
      token: this.getJwtToken({ id: result.id }),
    };
  }

  async renewToken(user: User) {
    const { password: _, ...result } = user;
    return {
      ...result,
      token: this.getJwtToken({ id: result.id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
