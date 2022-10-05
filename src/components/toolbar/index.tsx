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

import { Dropdown, Menu } from 'antd'
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
import { switchLink } from '@/utils/common'

interface IProps {
  editorRef: HTMLTextAreaElement | null
  mdStr: string
  setMdStr: (v: string) => void
}

const Toolbar: React.FC<IProps> = ({ editorRef, mdStr, setMdStr }) => {
  const [codeTheme, setCodeTheme] = useState(CODE_THEME.a11yDark)
  const [mdTheme, setMdTheme] = useState(MD_THEME.gitlab)

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
        items={Object.values(CODE_THEME).map((val) => ({
          label: val,
          key: val
        }))}
        selectedKeys={[codeTheme]}
      />
    ),
    [codeTheme]
  )

  useEffect(() => {
    if (codeTheme) {
      switchLink(
        'code-style',
        `https://cdn.bootcdn.net/ajax/libs/highlight.js/11.6.0/styles/${codeTheme}.min.css`
      )
    }
  }, [codeTheme])

  const MdThemeMenu = useMemo(
    () => (
      <Menu
        onClick={({ key }) => setMdTheme(key)}
        items={Object.values(MD_THEME).map((val) => ({
          label: val,
          key: val
        }))}
        selectedKeys={[mdTheme]}
      />
    ),
    [mdTheme]
  )

  useEffect(() => {
    if (mdTheme) {
      switchLink('md-style', `/src/assets/mdTheme/${mdTheme}.css`)
    }
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
      <div className={`${styles.item} ${styles.largeItem}`}>
        <Dropdown
          placement="bottom"
          overlay={CodeThemeMenu}
          overlayStyle={{ maxHeight: '200px', overflow: 'scroll' }}
        >
          <div>CodeTheme</div>
        </Dropdown>
      </div>
      <div className={`${styles.item} ${styles.largeItem}`}>
        <Dropdown
          placement="bottom"
          overlay={MdThemeMenu}
          overlayStyle={{ maxHeight: '200px', overflow: 'scroll' }}
        >
          <div>MdTheme</div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Toolbar
