import React, { useEffect, useMemo, useState } from 'react'
import {
  addImage,
  addLink,
  addTable,
  changeSelectLineStatus,
  changeSelectTextStatus
} from '@/utils/editor'
import {
  CODE_THEME,
  LINE_STATUS,
  MD_THEME,
  TEXT_STATUS
} from '@/utils/constants'

import { Dropdown, Menu, message } from 'antd'
import BoldIcon from '../icons/bold'
import DeleteIcon from '../icons/delete'
import ItalicIcon from '../icons/italic'
import UnderlineIcon from '../icons/underline'
import OlIcon from '../icons/ol'
import UlIcon from '../icons/ul'
import TodoIcon from '../icons/todo'
import QuoteIcon from '../icons/quote'
import LinkIcon from '../icons/link'
import TableIcon from '../icons/table'
import ImgIcon from '../icons/img'
// import ProjectPanel from '../projectPanel'

import styles from './index.module.less'

interface IProps {
  editorRef: HTMLTextAreaElement | null
  mdStr: string
  setMdStr: (v: string) => void
}

const Toolbar: React.FC<IProps> = ({ editorRef, mdStr, setMdStr }) => {
  const [codeTheme, setCodeTheme] = useState('')
  const [mdTheme, setMdTheme] = useState('')

  // 点击文字改变
  const clickTextStatus = (type: TEXT_STATUS) => {
    if (editorRef) {
      changeSelectTextStatus(editorRef, mdStr, setMdStr, type)
    }
  }

  // 点击行状态改变
  const clickLineStatus = (type: LINE_STATUS) => {
    if (editorRef) {
      changeSelectLineStatus(editorRef, mdStr, setMdStr, type)
    }
  }

  const CodeThemeMenu = useMemo(
    () => (
      <Menu
        onClick={({ key }) => setCodeTheme(key)}
        items={Object.keys(CODE_THEME).map((key) => ({
          label: CODE_THEME[key],
          key
        }))}
        selectedKeys={[codeTheme]}
      />
    ),
    [codeTheme]
  )

  useEffect(() => {
    const head = document.head
    const oldLink = head.getElementsByClassName('highlightjs-style-link')

    if (oldLink.length) head.removeChild(oldLink[0])

    const newLink = document.createElement('link')
    newLink.setAttribute('rel', 'stylesheet')
    newLink.setAttribute('type', 'text/css')
    newLink.setAttribute('class', 'highlightjs-style-link')
    newLink.setAttribute(
      'href',
      `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/${codeTheme}.min.css`
    )
    newLink.onerror = () => {
      message.error('主题获取失败，请稍后重试或尝试其它主题')
    }
    head.appendChild(newLink)
  }, [codeTheme])

  const MdThemeMenu = useMemo(
    () => (
      <Menu
        onClick={({ key }) => setMdTheme(key)}
        items={Object.keys(MD_THEME).map((key) => ({
          label: MD_THEME[key],
          key
        }))}
        selectedKeys={[mdTheme]}
      />
    ),
    [mdTheme]
  )

  useEffect(() => {
    const head = document.head
    const oldLink = head.getElementsByClassName('markdownTheme-style-link')

    if (oldLink.length) head.removeChild(oldLink[0])

    const newLink = document.createElement('link')
    newLink.setAttribute('rel', 'stylesheet')
    newLink.setAttribute('type', 'text/css')
    newLink.setAttribute('class', 'markdownTheme-style-link')
    newLink.setAttribute(
      'href',
      `https://lpyexplore.gitee.io/taobao_staticweb/css/theme/${mdTheme}.css`
    )
    newLink.onerror = () => {
      message.error('主题获取失败，请稍后重试或尝试其它主题')
    }
    head.appendChild(newLink)
  }, [mdTheme])

  return (
    <div className={styles.toolBar}>
      <div
        className={styles.item}
        onClick={() => clickTextStatus(TEXT_STATUS.STRONG)}
      >
        <BoldIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickTextStatus(TEXT_STATUS.DELETE)}
      >
        <DeleteIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickTextStatus(TEXT_STATUS.ITALIC)}
      >
        <ItalicIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickTextStatus(TEXT_STATUS.UNDERLINE)}
      >
        <UnderlineIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickLineStatus(LINE_STATUS.OL)}
      >
        <OlIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickLineStatus(LINE_STATUS.UL)}
      >
        <UlIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickLineStatus(LINE_STATUS.TODO)}
      >
        <TodoIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => clickLineStatus(LINE_STATUS.QUOTE)}
      >
        <QuoteIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editorRef) {
            addLink(editorRef, mdStr, setMdStr)
          }
        }}
      >
        <LinkIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editorRef) {
            addTable(editorRef, mdStr, setMdStr)
          }
        }}
      >
        <TableIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editorRef) {
            addImage(editorRef, mdStr, setMdStr)
          }
        }}
      >
        <ImgIcon />
      </div>
      <div className={styles.item}>
        <Dropdown
          placement="bottom"
          trigger={['click']}
          overlay={CodeThemeMenu}
        >
          <div>CodeTheme</div>
        </Dropdown>
      </div>
      <div className={styles.item}>
        <Dropdown placement="bottom" trigger={['click']} overlay={MdThemeMenu}>
          <div>MdTheme</div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Toolbar
