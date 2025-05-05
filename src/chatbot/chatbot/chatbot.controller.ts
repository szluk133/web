import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async askChatGPT(@Body() body: { message: string }) {
    const response = await this.chatbotService.chatWithGPT(body.message);
    return { reply: response };
  }
}
