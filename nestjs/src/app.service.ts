import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Where'd They Go?";
  }

  getLogin(): string {
    return 'login';
  }
}
