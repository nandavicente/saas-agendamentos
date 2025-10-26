import { Controller, Post, Body, Get, Query, Patch, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    return this.svc.create(dto as any);
  }

  @Get()
  async list(@Query('appointmentId') appointmentId?: string) {
    if (!appointmentId) return [];
    return this.svc.findByAppointment(Number(appointmentId));
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.svc.updateStatus(Number(id), body.status);
  }
}
