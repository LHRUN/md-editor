import {
  lineStatusObj,
  LINE_STATUS,
  textStatusObj,
  TEXT_STATUS
} from './constants'

/**
 * 获取光标位置
 * @param editor 编辑器元素
 */
export const getCursorPosition = (editor: HTMLTextAreaElement) => {
  const { selectionStart, selectionEnd } = editor
  return [selectionStart, selectionEnd]
}

/**
 * 改变已选文字状态
 * @param editor 编辑器元素
 * @param source 编辑器内容
 * @param setSource 修改编辑器内容
 * @param type 需修改状态类型
 */
export const changeSelectTextStatus = (
  editor: HTMLTextAreaElement,
  source: string,
  setSource: (v: string) => void,
  type: TEXT_STATUS
) => {
  const [start, end] = getCursorPosition(editor)
  const { symbol } = textStatusObj[type]
  let val = source
  if (start === end) {
    val = `${source.slice(0, start)}${symbol}${symbol}${source.slice(end)}`
  } else {
    val = `${source.slice(0, start)}${symbol}${source.slice(
      start,
      end
    )}${symbol}${source.slice(end)}`
  }
  setSource(val)
}

/**
 * 改变已选行状态
 * @param editor 编辑器元素
 * @param source 编辑器内容
 * @param setSource 修改编辑器内容
 * @param type 需修改状态类型
 */
export const changeSelectLineStatus = (
  editor: HTMLTextAreaElement,
  source: string,
  setSource: (v: string) => void,
  type: LINE_STATUS
) => {
  const [start, end] = getCursorPosition(editor)
  const { symbol } = lineStatusObj[type]
  let val = source
  if (start === end) {
    val = `${source.slice(0, start)}\n${symbol}\n${source.slice(end)}`
    setSource(val)
  } else {
    val = `${source.slice(0, start)}\n${symbol}${source.slice(
      start,
      end
    )}\n${source.slice(end)}`
  }
  setSource(val)
}

/**
 * 添加链接
 * @param editor 编辑器元素
 * @param source 编辑器内容
 * @param setSource 修改编辑器内容
 */
export const addLink = (
  editor: HTMLTextAreaElement,
  source: string,
  setSource: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = source
  if (start === end) {
    val = `${source.slice(0, start)}[链接描述文字](url)${source.slice(end)}`
  } else {
    val = `${source.slice(0, start)}[${source.slice(
      start,
      end
    )}](url)${source.slice(end)}`
  }
  setSource(val)
}

/**
 * 添加表格
 * @param editor 编辑器元素
 * @param source 编辑器内容
 * @param setSource 修改编辑器内容
 */
export const addTable = (
  editor: HTMLTextAreaElement,
  source: string,
  setSource: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = source
  if (start === end) {
    val = `${source.slice(
      0,
      start
    )}\n|  |  |\n| --- | --- |\n|  |  |${source.slice(end)}`
  } else {
    val = `${source.slice(0, start)}\n| ${source.slice(
      start,
      end
    )} |  |\n| --- | --- |\n|  |  |${source.slice(end)}`
  }
  setSource(val)
}

/**
 * 添加图片
 * @param editor 编辑器元素
 * @param source 编辑器内容
 * @param setSource 修改编辑器内容
 */
export const addImage = (
  editor: HTMLTextAreaElement,
  source: string,
  setSource: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = source
  if (start === end) {
    val = `${source.slice(0, start)}\n![图片描述](url)\n${source.slice(end)}`
  } else {
    val = `${source.slice(0, start)}\n![${source.slice(
      start,
      end
    )}](url)\n${source.slice(end)}`
  }
  setSource(val)
}
