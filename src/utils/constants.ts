export enum TEXT_STATUS {
  STRONG, // 加粗
  DELETE, // 删除
  ITALIC, // 斜体
  UNDERLINE // 下划线
}

export const textStatusObj = {
  [TEXT_STATUS.STRONG]: {
    desc: '加粗',
    symbol: '**'
  },
  [TEXT_STATUS.DELETE]: {
    desc: '删除',
    symbol: '~~'
  },
  [TEXT_STATUS.ITALIC]: {
    desc: '斜体',
    symbol: '_'
  },
  [TEXT_STATUS.UNDERLINE]: {
    desc: '下划线',
    symbol: '<u>'
  }
}

export enum LINE_STATUS {
  UL, // 无序列表
  OL, // 有序列表
  TODO // 任务列表
}

export const lineStatusObj = {
  [LINE_STATUS.UL]: {
    desc: '无序列表',
    symbol: '- '
  },
  [LINE_STATUS.OL]: {
    desc: '有序列表',
    symbol: '1. '
  },
  [LINE_STATUS.TODO]: {
    desc: '任务列表',
    symbol: '- [x]'
  }
}
