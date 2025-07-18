import { Injectable } from '@nestjs/common';
import { GenerateOutingsDto } from './dto/generate-outings.dto';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class OutingsService {
  constructor(private readonly openaiService: OpenaiService) {}

  async generateOutings(
    generateOutingsDto: GenerateOutingsDto,
  ): Promise<string> {
    const response = await this.openaiService.createResponse(
      'Saluda a Jose Terán',
    );
    return `Outings generated with the following data: ${JSON.stringify(generateOutingsDto)} | Response from OpenAI: ${response.output_text}`;
  }
}
