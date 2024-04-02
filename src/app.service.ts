import { Injectable } from '@nestjs/common';
import { data } from './data';

@Injectable()
export class AppService {
  private data = data;
  public getHello(): string {
    return 'Hello World!';
  }

  public async getOverview() {
    return data.overview;
  }

  public async getOperators() {
    return data.operators;
  }

  public async getTopConvo() {
    return data['top-conversations'];
  }

  public async getContacts() {
    return data.contacts;
  }

  public async getChats() {
    return data.chats;
  }
  public async getChatById(id: string) {
    return data.messages.filter((message) => message.id === id);
  }
}
