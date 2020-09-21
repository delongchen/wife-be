import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { TextService } from '../service/text.service';
import { ChangeEvent } from '../interface/ChangeEvent';

@Controller()
export class AppController {
  constructor (
    private readonly textService: TextService
  ){}

  @Post('/text')
  emitEvent(@Body() body: ChangeEvent): ChangeEvent {
    console.log(body);
    return this.textService.eventHandler(body)
  }

  @Get('/text')
  getText(@Query('path') path: string): ChangeEvent {
    const textNode = this.textService.getText(path)
    if (textNode === null) return ChangeEvent.ERR.message('not find')
    return ChangeEvent.OK.setData(textNode)
  }
}
