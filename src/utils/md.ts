import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import MarkdownItToc from 'markdown-it-toc'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItTaskLists from 'markdown-it-task-lists'

export const MD = new MarkdownIt({
  html: true, // 在源码中启用 HTML 标签
  linkify: true, // 将类似 URL 的文本自动转换为链接
  breaks: true, // 转换段落里的 '\n' 到 <br>
  // typographer: true, // 启用一些语言中立的替换 + 引号美化
  highlight: function (str, lang) {
    return highlightFormatCode(str, lang)
  }
})
  .use(MarkdownItToc)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItMark)
  .use(MarkdownItDeflist)
  .use(MarkdownItTaskLists)

const highlightFormatCode = (str: string, lang: string): string => {
  let lines: string[] = []
  if (lang && hljs.getLanguage(lang)) {
    // 有代码语言
    try {
      const preCode = hljs.highlight(lang, str, true).value
      lines = preCode.split(/\n/).slice(0, -1)
    } catch (e) {
      console.error(e)
    }
  } else {
    // 未添加代码语言
    const preCode = MD.utils.escapeHtml(str)
    lines = preCode.split(/\n/).slice(0, -1)
  }
  let html = lines
    .map((item, index) => {
      return (
        '<li><span class="line-num" data-line="' +
        (index + 1) +
        '"></span>' +
        item +
        '</li>'
      )
    })
    .join('')
  html = '<ol>' + html + '</ol>'
  return '<pre class="hljs"><code>' + html + '</code></pre>'
}
