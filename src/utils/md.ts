import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItTaskLists from 'markdown-it-task-lists'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItEmoji from 'markdown-it-emoji'
import markdownItIns from 'markdown-it-ins'
import markdownItKatex from 'markdown-it-katex'
import markdownItMermaid from '@wekanteam/markdown-it-mermaid'

import Renderer from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import { Toc } from './toc'

/**
 * init Markdown-it
 */
export const MD = new MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  breaks: true, // Convert '\n' in paragraphs into <br>
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
  .use(markdownItEmoji)
  .use(markdownItIns)
  .use(markdownItKatex)
  .use(markdownItMermaid)

/**
 * Formatting code blocks
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
 * Add code block style
 * @param val
 */
const codeBlockStyle = (val: string): string => {
  return `<pre class="hljs" style="padding: 10px;border-radius: 10px;"><code>${val}</code></pre>`
}

export const toc = new Toc()

/**
 * Inject line number
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
 * Get the title content splice list
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
