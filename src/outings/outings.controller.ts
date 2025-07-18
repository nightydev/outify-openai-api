import { Controller, Post, Body } from '@nestjs/common';
import { OutingsService } from './outings.service';
import { GenerateOutingsDto } from './dto/generate-outings.dto';
import { GeneratedOutingsResponse } from './interfaces/generated-outings.interface';

@Controller('outings')
export class OutingsController {
  constructor(private readonly outingsService: OutingsService) {}

  @Post()
  generateOutings(
    @Body() generateOutingsDto: GenerateOutingsDto,
  ): Promise<GeneratedOutingsResponse> {
    return this.outingsService.generateOutings(generateOutingsDto);
  }
}
