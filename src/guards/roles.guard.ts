import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Authorization header not found',
      });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Invalid Token' });
    }
    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
      });
    }
    req.user = user;

    const permission = user.roles.some((role: any) =>
      requireRoles.includes(role.value),
    );
    if (!permission) {
      throw new ForbiddenException({ message: 'Sizga ruxsat berilmagan' });
    }

    return true;
  }
}
