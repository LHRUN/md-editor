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
  if (start === end) {
    const val = `${mdStr.slice(0, start)}${symbol}${desc}${symbol}${mdStr.slice(
      end
    )}`
    setMdStr(val)
  } else {
    const val = `${mdStr.slice(0, start)}${symbol}${mdStr.slice(
      start,
      end
    )}${symbol}${mdStr.slice(end)}`
    setMdStr(val)
  }
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
  if (start === end) {
    const val = `${mdStr.slice(0, start)}\n${symbol}${desc}\n${mdStr.slice(
      end
    )}`
    setMdStr(val)
  } else {
    const val = `${mdStr.slice(0, start)}\n${symbol}${mdStr.slice(
      start,
      end
    )}\n${mdStr.slice(end)}`
    setMdStr(val)
  }
}
