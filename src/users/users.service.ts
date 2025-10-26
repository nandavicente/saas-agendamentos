// backend/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(role?: string, tenantId?: number) {
    const where: any = {};
    if (role) where.role = role;
    if (tenantId) where.tenantId = tenantId;
    return this.prisma.user.findMany({ where });
  }

  async createUser(data: { name: string; email: string; password: string; role: string; tenantId?: number; phone?: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: data.role,
        tenantId: data.tenantId ?? 1,
        phone: data.phone,
      },
    });
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
