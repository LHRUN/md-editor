export const buildScrollMap = (
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
  sourceLikeDiv.style.lineHeight = editor.style.lineHeight
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
    _scrollMap[t] = Math.round(el.offsetTop + offset)
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
