import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  private client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async getHello(): Promise<string> {
    const response = await this.client.responses.create({
      model: 'gpt-4.1',
      input: 'Write a one-sentence bedtime story about a unicorn.',
    });

    console.log(response.output_text);
    return 'Hello World!';
  }
}
