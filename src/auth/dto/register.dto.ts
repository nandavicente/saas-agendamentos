import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty() @IsString() name: string;
  @IsEmail() email: string;
  @IsNotEmpty() @IsString() password: string;
  @IsNotEmpty() @IsString() role: string; // ex: 'CLIENT' | 'PROFESSIONAL' | 'ADMIN'
  tenantId?: number;
}
