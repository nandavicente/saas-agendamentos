import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() @IsString() domain?: string;
}
