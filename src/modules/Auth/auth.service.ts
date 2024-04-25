import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/User';
import { LoginDto } from './auth.dto';
import { BaseUserDto } from '../User/users.dto';
import { generateHash, isPasswordValidate } from '../../utils/utils.encryption';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @InjectRepository(User) private userRepo: Repository<User>;
  @Inject(JwtService) private jwtService: JwtService;

  private async generateToken(id: string, email: string) {
    return this.jwtService.sign({ id, email });
  }
  public async login(loginData: LoginDto) {
    const user = await this.userRepo.findOneBy({ email: loginData.email });
    if (user && (await isPasswordValidate(loginData.password, user.password))) {
      const { id, email, firstName, lastName, profile } = user;
      const token = await this.generateToken(id, email);
      return {
        success: true,
        data: { id, email, firstName, lastName, token, profile },
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Failed to login',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public async register(user: BaseUserDto) {
    if (await this.userRepo.findOneBy({ email: user.email })) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await generateHash(user.password);
    const data = this.userRepo.save(
      this.userRepo.create({ ...user, password }),
    );
    return { success: true, data };
  }
}
