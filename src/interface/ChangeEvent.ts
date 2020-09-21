import { TextNode } from '../core/TextTree/TextNode'
export class ChangeEvent {
  action?: string
  status: boolean
  msg?: string
  data?: TextNode
  reason?: string

  static err(): ChangeEvent {
    const e = new ChangeEvent()
    e.status = false
    return e
  }

  static ok(): ChangeEvent {
    const e = new ChangeEvent()
    e.status = true
    return e
  }

  static ERR = ChangeEvent.err()
  static OK = ChangeEvent.ok()

  message(msg: string): ChangeEvent{
    this.msg = msg
    return this
  }

  setData(d: TextNode): ChangeEvent {
    this.data = d
    return this
  }

  why(reason: string): ChangeEvent {
    if (this.status === false)
      this.reason = reason
    return this
  }
}
