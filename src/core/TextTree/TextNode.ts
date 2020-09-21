const SPLIT_CHAR = '.'

export class TextNode {
  children?: TextNode[]
  dscriptions?: TextNode[]
  content?: string
  id?: string
  title: string
  
  static getInstance(title: string, children?: Array<any> | string): TextNode{
    const instance = new TextNode(title)
    if (children) {
      instance.addChildren(children)
    }
    return instance
  }

  static setNodeId(node: TextNode, id?: string) {
    if (id) node.id = id

    const children = node.children
    if (children) {
      children.forEach((v, k) => {
        TextNode.setNodeId(v, id ? `${id}${SPLIT_CHAR}${k}` : `${k}`)
      })
    }
  }

  constructor(title: string) {
    this.title = title
  }

  static find(node: TextNode, path?: string): TextNode {
    if (!path) return node
    const position = path.split(SPLIT_CHAR)
    let now = node
    while (position.length) {
      now = now.children[position.shift()]
      if (!now) return null
      if (!now.children) return now
    }
    return now
  }

  addChildren(nodes?: (string | Array<string | TextNode> | TextNode)) : TextNode {
    if (nodes === undefined) return
    if (this.children === undefined) this.children = new Array<TextNode>()

    const children = this.children

    if (nodes instanceof TextNode) {
      children.push(nodes)
    } else if (typeof nodes === 'string') {
      const strChildren = new TextNode(nodes)
      children.push(strChildren)
    } else if (Array.isArray(nodes)) {
      nodes.forEach((value) => {
        this.addChildren(value)
      })
    }

    return this
  }

  find(path?: string): TextNode {
    return TextNode.find(this, path)
  }

  addID(): TextNode {
    TextNode.setNodeId(this)
    return this
  }
}
