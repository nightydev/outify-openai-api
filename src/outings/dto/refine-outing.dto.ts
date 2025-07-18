import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneratedOuting } from '../interfaces/generated-outings.interface';

export class RefineOutingDto {
  @ValidateNested()
  @Type(() => GeneratedOuting)
  @IsNotEmpty()
  outingGenerated: GeneratedOuting;

  @IsString()
  @IsNotEmpty()
  initialGeneratedPrompt: string;

  @IsString()
  @IsNotEmpty()
  prompt: string;
}
