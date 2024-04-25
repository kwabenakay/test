import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  public async handleLogin(email: string, password: string) {
    if (email && password) {
      const selectedUser = data.user.filter(
        (user) => user.email === email && user.password === password,
      )[0];
      if (selectedUser)
        return {
          code: 200,
          email: selectedUser.email,
          userId: selectedUser.id,
        };
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'failed to login',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public validate(userId: string) {
    return data.user.filter((user) => user.id === userId).length === 1;
  }
}
