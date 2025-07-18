import { Module } from '@nestjs/common';
import { OutingsService } from './outings.service';
import { OutingsController } from './outings.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  controllers: [OutingsController],
  providers: [OutingsService],
  imports: [OpenaiModule],
})
export class OutingsModule {}
