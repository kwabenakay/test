import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { isTokenExpired } from '../../utils/utils.encryption';
import { getToken } from '../../utils/utils.token';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService) jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctxRequest: Request = context.switchToHttp().getRequest();
    const token = getToken(ctxRequest);
    if (!token) return false;
    if (isTokenExpired(this.jwtService.decode(token).exp)) return false;
    return true;
  }
}
