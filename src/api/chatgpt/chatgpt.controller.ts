import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('suggest')
  async suggestBooks(
    @Body() { message }: { message: string }
  ): Promise<string[]> {
    const bookSuggestions =
      await this.chatGptService.getBookSuggestions(message);
    return bookSuggestions;
  }
}
