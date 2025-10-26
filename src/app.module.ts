import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';

import { AppointmentsController } from './appointments/appointments.controller';
import { AppointmentsService } from './appointments/appointments.service';

import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';

import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    ServicesController,
    AppointmentsController,
    PaymentsController,
    TenantsController,
  ],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    UsersService,
    ServicesService,
    AppointmentsService,
    PaymentsService,
    TenantsService,
  ],
})
export class AppModule {}
