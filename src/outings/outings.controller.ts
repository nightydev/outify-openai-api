import { Controller, Post, Body } from '@nestjs/common';
import { OutingsService } from './outings.service';
import { GenerateOutingsDto } from './dto/generate-outings.dto';
import { GeneratedOutingsResponse } from './interfaces/generated-outings.interface';
import { RefineOutingDto } from './dto/refine-outing.dto';

@Controller('outings')
export class OutingsController {
  constructor(private readonly outingsService: OutingsService) {}

  @Post('generate')
  generateOutings(
    @Body() generateOutingsDto: GenerateOutingsDto,
  ): Promise<GeneratedOutingsResponse> {
    return this.outingsService.generateOutings(generateOutingsDto);
  }

  @Post('refine')
  refineOuting(@Body() refineOutingDto: RefineOutingDto) {
    return this.outingsService.refineOuting(refineOutingDto);
  }
}
