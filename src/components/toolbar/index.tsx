import React, { useMemo, useState } from 'react'
import {
  addImage,
  addLink,
  addTable,
  changeSelectLineStatus,
  changeSelectTextStatus
} from '@/utils/editor'
import { LINE_STATUS, TEXT_STATUS } from '@/utils/constants'

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
import ThemeIcon from '../icons/theme'
import CodeThemeIcon from '../icons/codeTheme'

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

  const CodeThemeMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item>菜单项一</Menu.Item>
        <Menu.Item>菜单项二</Menu.Item>
      </Menu>
    )
  }, [codeTheme])

  const MdThemeMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item>菜单项一</Menu.Item>
        <Menu.Item>菜单项二</Menu.Item>
      </Menu>
    )
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
        <Dropdown placement="bottom" overlay={MdThemeMenu}>
          <ThemeIcon />
        </Dropdown>
      </div>
      <div className={styles.item}>
        <Dropdown placement="bottom" overlay={CodeThemeMenu}>
          <CodeThemeIcon />
        </Dropdown>
      </div>
    </div>
  )
}

export default Toolbar
