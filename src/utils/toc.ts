export interface ITitle {
  level: number // title level # 1 ## 2 ### 3...
  val: string // title content
}

export class Toc {
  list: ITitle[] // title list

  constructor() {
    this.list = []
  }

  push(item: ITitle) {
    this.list.push(item)
  }

  clear() {
    this.list = []
  }

  get() {
    return this.list
  }
}
