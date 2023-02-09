import { SCROLL_SCOPE } from './constants'

const LINE_HEIGHT = 24 // Editor line height

/**
 * Get the preview offset distance for each line of the edit area
 * @param editor editor dom
 * @param review review dom
 * @returns number[]
 */
const buildScrollMap = (
  editor: HTMLTextAreaElement,
  review: HTMLDivElement
) => {
  const lineHeightMap: number[] = []
  let totalLineCount = 0 // total number of lines in the editing area

  /**
   * Temporarily create elements to get the total number of lines between each line break
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
  totalLineCount = acc

  const _scrollMap: number[] = new Array(totalLineCount).fill(-1) // offset map of the final output

  /**
   * Get the offset distance of the marker line number
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

  nonEmptyList.push(totalLineCount)
  _scrollMap[totalLineCount] = review.scrollHeight

  /**
   * Unmarked elements are get proportionally
   */
  let pos = 0
  for (let i = 1; i < totalLineCount; i++) {
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
let curScroll = SCROLL_SCOPE.NULL // cur scroll element
let syncScroll = true // sync scroll status

/**
 * editor area scroll
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
 * preview area scroll
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

export const clearScrollMap = () => {
  scrollMap = null
}

export const changeSyncScroll = (state: boolean) => {
  syncScroll = state
}
