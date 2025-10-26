import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as any;

    const tenantHeader = req.headers['x-tenant-id'];
    const tenantId = tenantHeader ? Number(tenantHeader) : undefined;

    if (!user) throw new ForbiddenException('Usuário não autenticado');
    if (!tenantId) {
      
      throw new ForbiddenException('Tenant não informado');
    }

    if (user.tenantId !== Number(tenantId)) {
      throw new ForbiddenException('Acesso negado ao tenant');
    }

    return true;
  }
}
