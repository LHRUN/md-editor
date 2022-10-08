import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import MarkdownItToc from 'markdown-it-toc'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItTaskLists from 'markdown-it-task-lists'
import Renderer from 'markdown-it/lib/renderer'

export const MD = new MarkdownIt({
  html: true, // 在源码中启用 HTML 标签
  linkify: true, // 将类似 URL 的文本自动转换为链接
  // breaks: true, // 转换段落里的 '\n' 到 <br>
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
  if (lang && hljs.getLanguage(lang)) {
    try {
      return codeBlockStyle(hljs.highlight(lang, str, true).value)
    } catch (e) {
      console.error(e)
    }
  }

  return codeBlockStyle(MD.utils.escapeHtml(str))
}

const codeBlockStyle = (val: string): string => {
  return `<pre class="hljs" style="padding: 10px;border-radius: 10px;"><code>${val}</code></pre>`
}

const injectLineNumbers: Renderer.RenderRule = (
  tokens,
  idx,
  options,
  _env,
  slf
) => {
  let line
  if (tokens[idx].map && tokens[idx].level === 0) {
    line = (tokens[idx].map as [number, number])[0]
    tokens[idx].attrJoin('class', 'line')
    tokens[idx].attrSet('data-line', String(line))
  }
  return slf.renderToken(tokens, idx, options)
}

MD.renderer.rules.paragraph_open = MD.renderer.rules.heading_open =
  injectLineNumbers
