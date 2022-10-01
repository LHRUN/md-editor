import {
  lineStatusObj,
  LINE_STATUS,
  textStatusObj,
  TEXT_STATUS
} from './constants'

/**
 * 获取光标位置
 * @param editor md编辑器
 */
export const getCursorPosition = (editor: HTMLTextAreaElement) => {
  const { selectionStart, selectionEnd } = editor
  return [selectionStart, selectionEnd]
}

/**
 * 改变已选文字状态
 * @param editor 编辑器元素
 * @param mdStr 编辑器内容
 * @param setMdStr 修改编辑器内容
 * @param type 需修改状态类型
 */
export const changeSelectTextStatus = (
  editor: HTMLTextAreaElement,
  mdStr: string,
  setMdStr: (v: string) => void,
  type: TEXT_STATUS
) => {
  const [start, end] = getCursorPosition(editor)
  const { symbol, desc } = textStatusObj[type]
  let val = mdStr
  if (start === end) {
    val = `${mdStr.slice(0, start)}${symbol}${desc}${symbol}${mdStr.slice(end)}`
  } else {
    val = `${mdStr.slice(0, start)}${symbol}${mdStr.slice(
      start,
      end
    )}${symbol}${mdStr.slice(end)}`
  }
  setMdStr(val)
}

/**
 * 改变已选行状态
 * @param editor 编辑器元素
 * @param mdStr 编辑器内容
 * @param setMdStr 修改编辑器内容
 * @param type 需修改状态类型
 */
export const changeSelectLineStatus = (
  editor: HTMLTextAreaElement,
  mdStr: string,
  setMdStr: (v: string) => void,
  type: LINE_STATUS
) => {
  const [start, end] = getCursorPosition(editor)
  const { symbol, desc } = lineStatusObj[type]
  let val = mdStr
  if (start === end) {
    val = `${mdStr.slice(0, start)}\n${symbol}${desc}\n${mdStr.slice(end)}`
    setMdStr(val)
  } else {
    val = `${mdStr.slice(0, start)}\n${symbol}${mdStr.slice(
      start,
      end
    )}\n${mdStr.slice(end)}`
  }
  setMdStr(val)
}

/**
 * 添加链接
 * @param editor 编辑器元素
 * @param mdStr 编辑器内容
 * @param setMdStr 修改编辑器内容
 */
export const addLink = (
  editor: HTMLTextAreaElement,
  mdStr: string,
  setMdStr: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = mdStr
  if (start === end) {
    val = `${mdStr.slice(0, start)}[链接描述文字](url)${mdStr.slice(end)}`
  } else {
    val = `${mdStr.slice(0, start)}[${mdStr.slice(
      start,
      end
    )}](url)${mdStr.slice(end)}`
  }
  setMdStr(val)
}

/**
 * 添加表格
 * @param editor 编辑器元素
 * @param mdStr 编辑器内容
 * @param setMdStr 修改编辑器内容
 */
export const addTable = (
  editor: HTMLTextAreaElement,
  mdStr: string,
  setMdStr: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = mdStr
  if (start === end) {
    val = `${mdStr.slice(
      0,
      start
    )}\n|  |  |\n| --- | --- |\n|  |  |${mdStr.slice(end)}`
  } else {
    val = `${mdStr.slice(0, start)}\n| ${mdStr.slice(
      start,
      end
    )} |  |\n| --- | --- |\n|  |  |${mdStr.slice(end)}`
  }
  setMdStr(val)
}

/**
 * 添加图片
 * @param editor 编辑器元素
 * @param mdStr 编辑器内容
 * @param setMdStr 修改编辑器内容
 */
export const addImage = (
  editor: HTMLTextAreaElement,
  mdStr: string,
  setMdStr: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = mdStr
  if (start === end) {
    val = `${mdStr.slice(0, start)}\n![图片描述](url)\n${mdStr.slice(end)}`
  } else {
    val = `${mdStr.slice(0, start)}\n![${mdStr.slice(
      start,
      end
    )}](url)\n${mdStr.slice(end)}`
  }
  setMdStr(val)
}
