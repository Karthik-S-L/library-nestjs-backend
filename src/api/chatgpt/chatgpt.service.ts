import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatGptService {
  private readonly openai;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.CHATGPT_KEY,
    });
  }
  //Todo: Testing of this feature is remaining due to chatgpt free tier limit
  async getBookSuggestions(message: string): Promise<string[]> {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: process.env.CHATGPT_MODEL,
      });

      const bookSuggestions = chatCompletion.data.choices.map(
        (choice: { message: { content: any } }) => choice.message.content
      );
      return bookSuggestions;
    } catch (error) {
      console.error('Error communicating with ChatGPT:', error);
      return [];
    }
  }
}
