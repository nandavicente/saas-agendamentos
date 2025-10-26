import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private svc: TenantsService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.svc.create(dto as any);
  }

  @Get()
  async findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }
}
