import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
