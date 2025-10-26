import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto as any);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.authenticate(dto.email, dto.password);
    return this.auth.login(user);
  }
}
