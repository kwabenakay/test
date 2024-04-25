import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto, DeleteUserDto, ExistingUserDto } from './users.dto';

@Injectable()
export class UserService {
  @InjectRepository(User) private userRepo: Repository<User>;
  public loadUsers(): Promise<ExistingUserDto[]> {
    return this.userRepo.find();
  }

  public async add(user: CreateUserDto) {
    if (await this.userRepo.findOneBy({ email: user.email })) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.userRepo.save(this.userRepo.create(user));
    return { success: true, data };
  }

  public async delete(userId: DeleteUserDto) {
    if (!(await this.userRepo.findOneBy(userId))) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const data = this.userRepo.delete(userId);
    return { succss: true, data };
  }

  public async update(user: ExistingUserDto) {
    this.userRepo.findOneBy({ id: user.id });
    const data = this.userRepo.save(user);
    return { succss: true, data };
  }

  public async test(): Promise<string> {
    const rep = await this.add({
      firstName: 'kofi',
      lastName: 'Owusu',
      email: 'kofi@gmail.com',
      password: '12345',
      profile: '',
    });
    console.log(rep);
    return 'Hello World!';
  }
}
