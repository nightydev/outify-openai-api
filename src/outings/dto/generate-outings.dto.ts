import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Outing } from '../interfaces/outing.interface';
import { Partner } from '../interfaces/partner.interface';

export class PartnerDto implements Partner {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OutingDto)
  historialOutings: OutingDto[];
}

export class OutingDto implements Outing {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsNumber()
  valoration: number;

  @IsNumber()
  amountSpent: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerDto)
  partners: PartnerDto[];
}

export class GenerateOutingsDto {
  @IsString()
  location: string;

  @IsNumber()
  amountSpent: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerDto)
  partners: PartnerDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OutingDto)
  historialOutings: OutingDto[];

  @IsString()
  prompt: string;
}
