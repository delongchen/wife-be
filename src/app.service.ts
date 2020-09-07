import { Injectable } from '@nestjs/common';
import { TextRoot } from './core/TextTree/TextRoot';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify(TextRoot);
  }
}
