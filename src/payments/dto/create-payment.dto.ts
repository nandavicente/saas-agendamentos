import { IsInt, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsInt() appointmentId: number;
  @IsNumber() amount: number;
  @IsString() method: string;
  @IsOptional() providerId?: string;
  @IsOptional() installments?: number;
}
