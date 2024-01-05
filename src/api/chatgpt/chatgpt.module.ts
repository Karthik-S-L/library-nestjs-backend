import { Module } from '@nestjs/common';
import { ChatGptController } from './chatgpt.controller';
import { ChatGptService } from './chatgpt.service';

@Module({
  controllers: [ChatGptController],
  providers: [ChatGptService],
})
export class ChatgptModule {}
