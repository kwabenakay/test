import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { BaseUserDto } from '../User/users.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService) private authService: AuthService;

  @HttpCode(200)
  @Post('login')
  public login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('register')
  public register(@Body() signupData: BaseUserDto) {
    return this.authService.register(signupData);
  }
}
