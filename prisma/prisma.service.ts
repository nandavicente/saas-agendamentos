// backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private _tenant: any;
  public get tenant(): any {
    return this._tenant;
  }
  public set tenant(value: any) {
    this._tenant = value;
  }
  async onModuleInit() {
    await this.$connect(); // conecta ao banco ao iniciar o módulo
  }

  async onModuleDestroy() {
    await this.$disconnect(); // desconecta ao destruir o módulo
  }
}
