import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getServices(professionalId?: number, tenantId?: number) {
    const where: any = {};
    if (professionalId) where.professionalId = professionalId;
    if (tenantId) where.tenantId = tenantId;
    return this.prisma.service.findMany({ where });
  }

  async createService(data: { professionalId: number; name: string; price: number; durationMin?: number; tenantId?: number }) {
    return this.prisma.service.create({
      data: {
        professionalId: data.professionalId,
        name: data.name,
        price: data.price,
        durationMin: data.durationMin ?? 30,
        tenantId: data.tenantId ?? 1,
      },
    });
  }
}
