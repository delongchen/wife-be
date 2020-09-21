import { Injectable } from '@nestjs/common';
import { ChangeEvent } from '../interface/ChangeEvent';
import { TextRoot } from '../core/TextTree/TextRoot'
import { TextNode } from '../core/TextTree/TextNode';

const ADD = 'add'
const DEL = 'delete'

const ERR_RES = ChangeEvent.ERR
const OK_RES = ChangeEvent.OK

const h = TextNode.getInstance

@Injectable()
export class TextService {
  private readonly TEXT_CACHE = {}

  eventHandler(e: ChangeEvent): ChangeEvent{
    const action_and_position = e.action.split(':')
    if (action_and_position.length !== 2) return ERR_RES
    const action = action_and_position[0]
    const position = action_and_position[1]

    switch (action) {
      case ADD: {
        if (!e.data) return ERR_RES.why("no data")
        const data = e.data

        const target_node = this.getText(position)
        if (!target_node) return ERR_RES.why("no such node")

        const target_node_children = target_node.children || (target_node.children = [])
        const toAddNode = h(data.title)
        toAddNode.content = data.content
        target_node_children.push(h(data.title))

        return OK_RES.message('ok')
      }
      case DEL: {

      }
      default:
        return ERR_RES
    }
  }

  getText(path?: string): TextNode{
    if (path === undefined) return TextRoot

    const text = this.TEXT_CACHE[path]
    if (text === undefined) {
      const ret = TextRoot.find(path)
      if (ret !== null)
        this.TEXT_CACHE[path] = ret
      return ret
    }

    return text
  }
}
