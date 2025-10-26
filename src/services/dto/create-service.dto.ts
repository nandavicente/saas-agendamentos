import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsInt() professionalId: number;
  @IsNotEmpty() @IsString() name: string;
  @IsNumber() price: number;
  @IsOptional() durationMin?: number;
  @IsOptional() tenantId?: number;
}
