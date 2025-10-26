import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() @IsString() name: string;
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() role: string;
  @IsOptional() tenantId?: number;
  @IsOptional() phone?: string;
}
