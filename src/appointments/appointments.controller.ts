import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private svc: AppointmentsService) {}

  @Get()
  async list(
    @Query('tenantId') tenantId?: string,
    @Query('professionalId') professionalId?: string,
    @Query('clientId') clientId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('status') status?: string
  ) {
    return this.svc.getAppointments({
      tenantId: tenantId ? Number(tenantId) : undefined,
      professionalId: professionalId ? Number(professionalId) : undefined,
      clientId: clientId ? Number(clientId) : undefined,
      from,
      to,
      status,
    });
  }

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    return this.svc.createAppointment(dto as any);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusDto) {
    return this.svc.updateStatus(Number(id), body.status);
  }
}
