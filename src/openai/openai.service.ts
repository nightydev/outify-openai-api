import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  public client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async createResponse(prompt: string) {
    try {
      const response = await this.client.responses.create({
        model: 'gpt-4.1',
        input: prompt,
      });

      return response;
    } catch (error) {
      console.error('Error creating OpenAI response:', error);
      throw new Error('Failed to create OpenAI response');
    }
  }
}
