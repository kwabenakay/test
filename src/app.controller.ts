import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('overview')
  overview() {
    return this.appService.getOverview();
  }

  @Get('operators')
  operators() {
    return this.appService.getOperators();
  }

  @Get('top-conversations')
  topConvo() {
    return this.appService.getTopConvo();
  }

  @Get('contacts')
  contacts() {
    return this.appService.getContacts();
  }

  @Get('chats')
  chats() {
    return this.appService.getChats();
  }

  @Get('messages/:chatId')
  chatsById(@Param('chatId') id: string) {
    return this.appService.getChatById(id);
  }

  // @Get(':test')
  // test(@Param('test') test: string): string {
  //   return `params test value is ${test}`;
  // }
}
