import React, { useEffect, useMemo, useState } from 'react'
import {
  addImage,
  addLink,
  addTable,
  changeSelectLineStatus,
  changeSelectTextStatus
} from '@/utils/editor'
import { CODE_THEME, LINE_STATUS, TEXT_STATUS } from '@/utils/constants'
import { switchLink } from '@/utils/common'
import { MD_STATE_KEY, storage } from '@/utils/storage'
import { changeSyncScroll } from '@/utils/scroll'

import { Checkbox, Dropdown, Menu } from 'antd'
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
import TocIcon from '../icons/toc'
import GithubIcon from '../icons/github'
import ThemeIcon from '../icons/theme'

import styles from './index.module.less'

interface IProps {
  editorRef: HTMLTextAreaElement | null // 编辑元素
  source: string // markdown内容
  setSource: (v: string) => void // 修改markdown内容
  setShowToc: () => void // 修改目录展示状态
}

const Toolbar: React.FC<IProps> = ({
  editorRef,
  source,
  setSource,
  setShowToc
}) => {
  const [codeTheme, setCodeTheme] = useState(CODE_THEME.a11yDark)

  // 初始化缓存获取主题
  useEffect(() => {
    const storageData = storage.get(MD_STATE_KEY)
    if (storageData) {
      const { codeTheme } = storageData
      setCodeTheme(codeTheme)
    }
  }, [])

  // 点击文字改变
  const clickTextStatus = (type: TEXT_STATUS) => {
    if (editorRef) {
      changeSelectTextStatus(editorRef, source, setSource, type)
    }
  }

  // 点击行状态改变
  const clickLineStatus = (type: LINE_STATUS) => {
    if (editorRef) {
      changeSelectLineStatus(editorRef, source, setSource, type)
    }
  }

  const CodeThemeMenu = useMemo(
    () => (
      <Menu
        onClick={({ key }) => {
          setCodeTheme(key)
          storage.set(MD_STATE_KEY, {
            codeTheme: key
          })
        }}
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
            addLink(editorRef, source, setSource)
          }
        }}
      >
        <LinkIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editorRef) {
            addTable(editorRef, source, setSource)
          }
        }}
      >
        <TableIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editorRef) {
            addImage(editorRef, source, setSource)
          }
        }}
      >
        <ImgIcon />
      </div>
      <div className={styles.item}>
        <Dropdown
          placement="bottom"
          overlay={CodeThemeMenu}
          overlayStyle={{ maxHeight: '200px', overflow: 'auto' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon />
          </div>
        </Dropdown>
      </div>
      <div className={styles.right}>
        <Checkbox
          defaultChecked={true}
          onChange={(e) => changeSyncScroll(e.target.checked)}
        >
          同步滚动
        </Checkbox>
        <div onClick={() => setShowToc()} className={styles.item}>
          <TocIcon />
        </div>
        <a
          href="https://github.com/LHRUN/md-editor"
          target="_blank"
          className={styles.item}
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  )
}

export default Toolbar
