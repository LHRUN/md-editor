import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import MarkdownItToc from 'markdown-it-toc'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItMark from 'markdown-it-mark'

export const MD = new MarkdownIt({
  html: true, // 在源码中启用 HTML 标签
  linkify: true, // 将类似 URL 的文本自动转换为链接
  breaks: true, // 转换段落里的 '\n' 到 <br>
  typographer: true, // 启用一些语言中立的替换 + 引号美化
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (e) {
        console.error(e)
      }
    }

    return ''
  }
})
  .use(MarkdownItToc)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItMark)
