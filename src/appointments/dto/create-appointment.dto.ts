import { IsInt, IsISO8601 } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt() tenantId: number;
  @IsInt() clientId: number;
  @IsInt() professionalId: number;
  @IsInt() serviceId: number;
  @IsISO8601() scheduledAt: string;
}
