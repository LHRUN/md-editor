import {
  lineStatusObj,
  LINE_STATUS,
  textStatusObj,
  TEXT_STATUS
} from './constants'

/**
 * Get cursor position
 * @param editor editor element
 */
export const getCursorPosition = (editor: HTMLTextAreaElement) => {
  const { selectionStart, selectionEnd } = editor
  return [selectionStart, selectionEnd]
}

/**
 * Change selected text status
 * @param editor editor element
 * @param content editor content
 * @param setContent change edit content
 * @param type change type
 */
export const changeSelectTextStatus = (
  editor: HTMLTextAreaElement,
  content: string,
  setContent: (v: string) => void,
  type: TEXT_STATUS
) => {
  const [start, end] = getCursorPosition(editor)
  const { symbol } = textStatusObj[type]
  let val = content
  if (start === end) {
    val = `${content.slice(0, start)}${symbol}${symbol}${content.slice(end)}`
  } else {
    val = `${content.slice(0, start)}${symbol}${content.slice(
      start,
      end
    )}${symbol}${content.slice(end)}`
  }
  setContent(val)
}

/**
 * Change selected row status
 * @param editor editor element
 * @param content editor content
 * @param setContent change edit content
 * @param type change type
 */
export const changeSelectLineStatus = (
  editor: HTMLTextAreaElement,
  content: string,
  setContent: (v: string) => void,
  type: LINE_STATUS
) => {
  const [start, end] = getCursorPosition(editor)
  const { symbol } = lineStatusObj[type]
  let val = content
  if (start === end) {
    val = `${content.slice(0, start)}\n${symbol}\n${content.slice(end)}`
    setContent(val)
  } else {
    val = `${content.slice(0, start)}\n${symbol}${content.slice(
      start,
      end
    )}\n${content.slice(end)}`
  }
  setContent(val)
}

/**
 * content add link
 * @param editor editor element
 * @param content editor content
 * @param setContent change editor content
 */
export const addLink = (
  editor: HTMLTextAreaElement,
  content: string,
  setContent: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = content
  if (start === end) {
    val = `${content.slice(0, start)}[链接描述文字](url)${content.slice(end)}`
  } else {
    val = `${content.slice(0, start)}[${content.slice(
      start,
      end
    )}](url)${content.slice(end)}`
  }
  setContent(val)
}

/**
 * Add table
 * @param editor editor element
 * @param content editor content
 * @param setContent change editor content
 */
export const addTable = (
  editor: HTMLTextAreaElement,
  content: string,
  setContent: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = content
  if (start === end) {
    val = `${content.slice(
      0,
      start
    )}\n|  |  |\n| --- | --- |\n|  |  |${content.slice(end)}`
  } else {
    val = `${content.slice(0, start)}\n| ${content.slice(
      start,
      end
    )} |  |\n| --- | --- |\n|  |  |${content.slice(end)}`
  }
  setContent(val)
}

/**
 * add image
 * @param editor editor element
 * @param content editor content
 * @param setContent change editor content
 */
export const addImage = (
  editor: HTMLTextAreaElement,
  content: string,
  setContent: (v: string) => void
) => {
  const [start, end] = getCursorPosition(editor)
  let val = content
  if (start === end) {
    val = `${content.slice(0, start)}\n![图片描述](url)\n${content.slice(end)}`
  } else {
    val = `${content.slice(0, start)}\n![${content.slice(
      start,
      end
    )}](url)\n${content.slice(end)}`
  }
  setContent(val)
}
