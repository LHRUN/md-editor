import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItTaskLists from 'markdown-it-task-lists'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'

import Renderer from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import { Toc } from './toc'

/**
 * 初始化Markdown-it
 */
export const MD = new MarkdownIt({
  html: true, // 在源码中启用 HTML 标签
  linkify: true, // 将类似 URL 的文本自动转换为链接
  breaks: true, // 转换段落里的 '\n' 到 <br>
  highlight: function (str, lang) {
    return highlightFormatCode(str, lang)
  }
})
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItMark)
  .use(MarkdownItDeflist)
  .use(MarkdownItTaskLists)
  .use(markdownItAbbr)
  .use(markdownItFootnote)

/**
 * 格式化代码块
 * @param str
 * @param lang
 */
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

/**
 * 增加代码块样式
 * @param val
 */
const codeBlockStyle = (val: string): string => {
  return `<pre class="hljs" style="padding: 10px;border-radius: 10px;"><code>${val}</code></pre>`
}

export const toc = new Toc()

/**
 * 注入行号
 */
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

/**
 * 获取标题内容拼接目录列表
 */
const getTitle = (tokens: Token[], idx: number) => {
  const { children } = tokens[idx + 1]
  const { markup } = tokens[idx]
  const val = children?.reduce((acc, cur) => `${acc}${cur.content}`, '') || ''
  toc.push({
    val,
    level: markup.length
  })
}

MD.renderer.rules.heading_open = (tokens, idx, options, env, slf) => {
  getTitle(tokens, idx)
  injectLineNumbers(tokens, idx, options, env, slf)
  return slf.renderToken(tokens, idx, options)
}

MD.renderer.rules.paragraph_open = injectLineNumbers
