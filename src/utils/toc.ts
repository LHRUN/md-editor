// 标题结构
export interface ITitle {
  level: number // 标题等级
  val: string // 标题内容
}

export class Toc {
  list: ITitle[] // 目录列表

  constructor() {
    this.list = []
  }

  // 添加标题
  push(item: ITitle) {
    this.list.push(item)
  }

  // 清空目录
  clear() {
    this.list = []
  }

  // 获取目录
  get() {
    return this.list
  }
}
