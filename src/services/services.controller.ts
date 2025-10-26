import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private svc: ServicesService) {}

  @Get()
  async getAll(@Query('professionalId') professionalId?: string, @Query('tenantId') tenantId?: string) {
    return this.svc.getServices(professionalId ? Number(professionalId) : undefined, tenantId ? Number(tenantId) : undefined);
  }

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    return this.svc.createService(dto as any);
  }
}
