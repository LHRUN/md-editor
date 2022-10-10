import { SCROLL_SCOPE } from './constants'

/**
 *
 * @param editor 编辑元素
 * @param review 预览元素
 * @returns number[]
 */
const buildScrollMap = (
  editor: HTMLTextAreaElement,
  review: HTMLDivElement
) => {
  let i
  let offset = 0
  const nonEmptyList = []
  let pos = 0
  let a = 0
  let b = 0
  const lineHeightMap: number[] = []
  let linesCount = 0
  let acc = 0
  const _scrollMap = []

  const sourceLikeDiv = document.createElement('div')
  sourceLikeDiv.style.position = 'absolute'
  sourceLikeDiv.style.visibility = 'hidden'
  sourceLikeDiv.style.height = 'auto'
  sourceLikeDiv.style.width = `${editor.clientWidth}px`
  sourceLikeDiv.style.fontSize = editor.style.fontSize
  sourceLikeDiv.style.fontFamily = editor.style.fontFamily
  sourceLikeDiv.style.lineHeight = '24px'
  sourceLikeDiv.style.whiteSpace = editor.style.whiteSpace
  document.body.appendChild(sourceLikeDiv)

  offset = review.scrollTop - review.offsetTop

  acc = 0
  editor.value.split('\n').forEach((str) => {
    lineHeightMap.push(acc)
    if (str.length === 0) {
      acc++
      return
    }

    sourceLikeDiv.textContent = str
    const h = sourceLikeDiv.offsetHeight
    const lh = parseFloat('24')
    acc += Math.round(h / lh)
  })
  sourceLikeDiv.remove()
  lineHeightMap.push(acc)
  linesCount = acc

  for (i = 0; i < linesCount; i++) {
    _scrollMap.push(-1)
  }

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
    _scrollMap[t] = Math.round((el as HTMLElement).offsetTop + offset)
  })

  nonEmptyList.push(linesCount)
  _scrollMap[linesCount] = review.scrollHeight

  pos = 0
  for (i = 1; i < linesCount; i++) {
    if (_scrollMap[i] !== -1) {
      pos++
      continue
    }

    a = nonEmptyList[pos]
    b = nonEmptyList[pos + 1]
    _scrollMap[i] = Math.round(
      (_scrollMap[b] * (i - a) + _scrollMap[a] * (b - i)) / (b - a)
    )
  }

  return _scrollMap
}

let scrollMap: number[] | null
let curScroll = SCROLL_SCOPE.NULL // 当前滚动元素

/**
 * 编辑器滚动
 * @param editor
 * @param preview
 */
export const editorScroll = (
  editor: HTMLTextAreaElement,
  preview: HTMLDivElement
) => {
  if (curScroll === SCROLL_SCOPE.PREVIEW) {
    curScroll = SCROLL_SCOPE.EDITOR
    return
  }
  curScroll = SCROLL_SCOPE.EDITOR
  if (!scrollMap) {
    scrollMap = buildScrollMap(editor, preview)
  }
  const lineNo = Math.floor(editor.scrollTop / 24)
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
  editor.scrollTo({ top: 24 * Number(line) })
}

/**
 * 清空滚动映射
 */
export const clearScrollMap = () => {
  scrollMap = null
}
