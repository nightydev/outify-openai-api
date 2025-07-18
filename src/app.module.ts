import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OutingsModule } from './outings/outings.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OutingsModule,
    OpenaiModule,
  ],
})
export class AppModule {}
