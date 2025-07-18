import { Injectable } from '@nestjs/common';
import { GenerateOutingsDto } from './dto/generate-outings.dto';
import { OpenaiService } from 'src/openai/openai.service';
import {
  GeneratedOutingsResponse,
  GeneratedOuting,
} from './interfaces/generated-outings.interface';
import { RefineOutingDto } from './dto/refine-outing.dto';

@Injectable()
export class OutingsService {
  constructor(private readonly openaiService: OpenaiService) {}

  async generateOutings(
    generateOutingsDto: GenerateOutingsDto,
  ): Promise<GeneratedOutingsResponse> {
    const prompt = JSON.stringify(generateOutingsDto, null, 2);

    const response = await this.openaiService.createResponse(
      `Basada en la siguiente información, genera 3 titulares de salidas con una breve descripción de cada uno. Utiliza un tono amigable y atractivo. Tu respuesta debe estar **exclusivamente** en formato JSON con esta estructura exacta:

{
  "outings": [
    {
      "title": "Título 1",
      "description": "Descripción breve 1"
    },
    {
      "title": "Título 2",
      "description": "Descripción breve 2"
    },
    {
      "title": "Título 3",
      "description": "Descripción breve 3"
    }
  ],
  "initialGeneratedPrompt": ${JSON.stringify(prompt)}
}

No añadas ningún texto extra fuera de este JSON.

Información: ${prompt}
`,
    );

    try {
      // Manejar la respuesta de forma segura
      let responseText: string;

      if (typeof response === 'string') {
        responseText = response;
      } else if (
        response &&
        typeof response === 'object' &&
        'output_text' in response
      ) {
        // Nueva API de OpenAI con formato de respuesta completo
        responseText = response.output_text;
      } else if (response && typeof response === 'object') {
        // Fallback: Si es un objeto de OpenAI sin output_text, convertir a JSON
        responseText = JSON.stringify(response);
      } else {
        throw new Error('Invalid response format from OpenAI service');
      }

      const outings = JSON.parse(responseText) as GeneratedOutingsResponse;
      return outings;
    } catch (error) {
      console.error(
        'Error parsing OpenAI response:',
        error,
        'Response:',
        response,
      );
      throw new Error('Failed to parse OpenAI response as JSON');
    }
  }

  async refineOuting(
    refineOutingDto: RefineOutingDto,
  ): Promise<GeneratedOuting> {
    const { outingGenerated, initialGeneratedPrompt, prompt } = refineOutingDto;

    const response = await this.openaiService.createResponse(
      `Basada en la siguiente información, refina el titular y la descripción de la salida generada. Utiliza un tono amigable y atractivo. Tu respuesta debe estar **exclusivamente** en formato JSON con esta estructura exacta:

{
  "title": "Título refinado",
  "description": "Descripción refinada"
}

No añadas ningún texto extra fuera de este JSON.

Salida original a refinar:
Título: ${outingGenerated.title}
Descripción: ${outingGenerated.description}

Prompt inicial utilizado: ${initialGeneratedPrompt}

Instrucciones adicionales del usuario: ${prompt}
`,
    );

    try {
      // Manejar la respuesta de forma segura
      let responseText: string;

      if (typeof response === 'string') {
        responseText = response;
      } else if (
        response &&
        typeof response === 'object' &&
        'output_text' in response
      ) {
        // Nueva API de OpenAI con formato de respuesta completo
        responseText = response.output_text;
      } else if (response && typeof response === 'object') {
        // Fallback: Si es un objeto de OpenAI sin output_text, convertir a JSON
        responseText = JSON.stringify(response);
      } else {
        throw new Error('Invalid response format from OpenAI service');
      }

      const refinedOuting = JSON.parse(responseText) as GeneratedOuting;
      return refinedOuting;
    } catch (error) {
      console.error(
        'Error parsing OpenAI response for refine outing:',
        error,
        'Response:',
        response,
      );
      throw new Error(
        'Failed to parse OpenAI response as JSON for refine outing',
      );
    }
  }
}
