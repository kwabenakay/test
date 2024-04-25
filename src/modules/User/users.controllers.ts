import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { BaseUserDto, CreateUserDto, DeleteUserDto, IdDto } from './users.dto';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Get()
  public async loadUsers() {
    return this.userService.loadUsers();
  }

  @Get('test')
  public test() {
    return this.userService.test();
  }

  @Post()
  public add(@Body() user: CreateUserDto) {
    return this.userService.add(user);
  }

  @Put(':id')
  public update(@Param('id') id: IdDto, @Body() user: BaseUserDto) {
    return this.userService.update({ ...user, ...id });
  }

  @Delete(':id')
  public async delete(@Param('id') id: DeleteUserDto) {
    return this.userService.delete(id);
  }
}
