import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(data: { name: string; email: string; password: string; role: string; tenantId?: number }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: data.role,
        tenantId: data.tenantId ?? 1,
      },
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    const { password, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId };
    return { access_token: this.jwt.sign(payload) };
  }

  async authenticate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');
    const { password: _, ...rest } = user;
    return rest;
  }
}
