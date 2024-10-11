import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Nếu không có roles yêu cầu, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Lấy thông tin user đã được JwtAuthGuard gán vào request

    return roles.includes(user.role); // Kiểm tra role của user với roles yêu cầu
  }
}
