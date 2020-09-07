export class TextNode {
  children?: TextNode[]
  title: string

  static getInstance(title: string, children?: Array<any> | string): TextNode{
    return new TextNode(title, children)
  }

  constructor(title: string, children?: Array<any> | string) {
    this.title = title
    if (children) {
      this.addChildren(children)
    }
  }

  addChildren(nodes?: string | Array<string | TextNode> | TextNode) : TextNode {
    if (nodes === undefined) return
    if (this.children === undefined) this.children = new Array<TextNode>()

    const children = this.children

    if (nodes instanceof TextNode) {
      children.push(nodes)
    } else if (typeof nodes === 'string') {
      children.push(new TextNode(nodes))
    } else if (Array.isArray(nodes)) {
      nodes.forEach(value => {
        this.addChildren(value)
      })
    }
    return this
  }
}
