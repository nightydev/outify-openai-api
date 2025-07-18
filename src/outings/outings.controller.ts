import { Controller, Post, Body } from '@nestjs/common';
import { OutingsService } from './outings.service';
import { GenerateOutingsDto } from './dto/generate-outings.dto';

@Controller('outings')
export class OutingsController {
  constructor(private readonly outingsService: OutingsService) {}

  @Post()
  generateOutings(@Body() generateOutingsDto: GenerateOutingsDto) {
    return this.outingsService.generateOutings(generateOutingsDto);
  }
}
