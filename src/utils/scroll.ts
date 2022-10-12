import { SCROLL_SCOPE } from './constants'

const LINE_HEIGHT = 24 // 编辑器行高

/**
 * 获取编辑区域每行对应的预览偏移距离
 * @param editor 编辑元素
 * @param review 预览元素
 * @returns number[]
 */
const buildScrollMap = (
  editor: HTMLTextAreaElement,
  review: HTMLDivElement
) => {
  const lineHeightMap: number[] = []
  let linesCount = 0 // 编辑区总行数

  /**
   * 临时创建元素获取每次换行之间的总行数
   */
  const sourceLine = document.createElement('div')
  sourceLine.style.position = 'absolute'
  sourceLine.style.visibility = 'hidden'
  sourceLine.style.height = 'auto'
  sourceLine.style.width = `${editor.clientWidth}px`
  sourceLine.style.fontSize = '15px'
  sourceLine.style.lineHeight = `${LINE_HEIGHT}px`
  document.body.appendChild(sourceLine)
  let acc = 0
  editor.value.split('\n').forEach((str) => {
    lineHeightMap.push(acc)
    if (str.length === 0) {
      acc++
      return
    }
    sourceLine.textContent = str
    const h = sourceLine.offsetHeight
    acc += Math.round(h / LINE_HEIGHT)
  })
  sourceLine.remove()
  lineHeightMap.push(acc)
  linesCount = acc

  const _scrollMap: number[] = new Array(linesCount).fill(-1) // 最终输出的偏移map

  /**
   * 获取标记行号的offset距离
   */
  const nonEmptyList = []
  nonEmptyList.push(0)
  _scrollMap[0] = 0
  document.querySelectorAll('.line').forEach((el) => {
    let t: string | number = el.getAttribute('data-line') as string
    if (t === '') {
      return
    }
    t = lineHeightMap[Number(t)]
    if (t !== 0) {
      nonEmptyList.push(t)
    }
    _scrollMap[t] = Math.round((el as HTMLElement).offsetTop - review.offsetTop)
  })

  nonEmptyList.push(linesCount)
  _scrollMap[linesCount] = review.scrollHeight

  /**
   * 未标记行号的元素等比处理
   */
  let pos = 0
  for (let i = 1; i < linesCount; i++) {
    if (_scrollMap[i] !== -1) {
      pos++
      continue
    }
    const a = nonEmptyList[pos]
    const b = nonEmptyList[pos + 1]
    _scrollMap[i] = Math.round(
      (_scrollMap[b] * (i - a) + _scrollMap[a] * (b - i)) / (b - a)
    )
  }

  return _scrollMap
}

let scrollMap: number[] | null
let curScroll = SCROLL_SCOPE.NULL // 当前滚动元素
let syncScroll = true // 同步滚动状态

/**
 * 编辑器滚动
 * @param editor
 * @param preview
 */
export const editorScroll = (
  editor: HTMLTextAreaElement,
  preview: HTMLDivElement
) => {
  if (!syncScroll) {
    return
  }
  if (curScroll === SCROLL_SCOPE.PREVIEW) {
    curScroll = SCROLL_SCOPE.EDITOR
    return
  }
  curScroll = SCROLL_SCOPE.EDITOR
  if (!scrollMap) {
    scrollMap = buildScrollMap(editor, preview)
  }

  const lineNo = Math.floor(editor.scrollTop / LINE_HEIGHT)
  const posTo = scrollMap[lineNo]
  preview.scrollTo({ top: posTo })
}

/**
 * 预览区域滚动
 * @param editor
 * @param preview
 */
export const previewScroll = (
  editor: HTMLTextAreaElement,
  preview: HTMLDivElement
) => {
  if (!syncScroll) {
    return
  }
  if (curScroll === SCROLL_SCOPE.EDITOR) {
    curScroll = SCROLL_SCOPE.PREVIEW
    return
  }
  curScroll = SCROLL_SCOPE.PREVIEW

  if (!scrollMap) {
    scrollMap = buildScrollMap(editor, preview)
  }

  const lines = Object.keys(scrollMap)
  if (lines.length < 1) {
    return
  }
  let line = lines[0]
  for (let i = 1; i < lines.length; i++) {
    if (scrollMap[Number(lines[i])] < preview.scrollTop) {
      line = lines[i]
      continue
    }
    break
  }
  editor.scrollTo({ top: LINE_HEIGHT * Number(line) })
}

/**
 * 清空滚动映射
 */
export const clearScrollMap = () => {
  scrollMap = null
}

/**
 * 改变同步滚动状态
 */
export const changeSyncScroll = (state: boolean) => {
  syncScroll = state
}
