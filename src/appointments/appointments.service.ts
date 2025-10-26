import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async getAppointments(filters?: { tenantId?: number; professionalId?: number; clientId?: number; from?: string; to?: string; status?: string }) {
    const where: any = {};
    if (filters?.tenantId) where.tenantId = filters.tenantId;
    if (filters?.professionalId) where.professionalId = filters.professionalId;
    if (filters?.clientId) where.clientId = filters.clientId;
    if (filters?.status) where.status = filters.status;
    if (filters?.from || filters?.to) where.scheduledAt = {};
    if (filters?.from) where.scheduledAt.gte = new Date(filters.from);
    if (filters?.to) where.scheduledAt.lte = new Date(filters.to);

    return this.prisma.appointment.findMany({
      where,
      include: { service: true, professional: true, client: true, payments: true },
      orderBy: { scheduledAt: 'desc' },
    });
  }

  async createAppointment(data: { tenantId: number; clientId: number; professionalId: number; serviceId: number; scheduledAt: string }) {
    return this.prisma.appointment.create({
      data: {
        tenantId: data.tenantId,
        clientId: data.clientId,
        professionalId: data.professionalId,
        serviceId: data.serviceId,
        scheduledAt: new Date(data.scheduledAt),
      },
    });
  }

  async updateStatus(id: number, status: string) {
    return this.prisma.appointment.update({ where: { id }, data: { status } });
  }
}
