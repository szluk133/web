import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async chatWithGPT(message: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4', // Hoặc 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: message }],
    });

    return response.choices[0]?.message?.content || 'Không có phản hồi.';
  }
}
