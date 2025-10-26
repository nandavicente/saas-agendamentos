import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; domain?: string }) {
    return this.prisma.tenant.create({ data });
  }

  async findAll() {
    return this.prisma.tenant.findMany();
  }

  async findOne(id: number) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }
}
