import { IsNotEmpty, IsString } from 'class-validator';

export class GeneratedOuting {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export interface GeneratedOutingsResponse {
  outings: GeneratedOuting[];
  initialGeneratedPrompt: string;
}
