import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TenantGuard } from './auth/tenant.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove props que não estão nos DTOs
      forbidNonWhitelisted: false,
      transform: true, // transforma payloads (ex: strings => numbers se DTO definir)
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(), new RolesGuard(reflector), new TenantGuard());

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
