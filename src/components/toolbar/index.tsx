import React, { useEffect, useMemo } from 'react'
import {
  addImage,
  addLink,
  addTable,
  changeSelectLineStatus,
  changeSelectTextStatus
} from '@/utils/editor'
import { CODE_THEME, LINE_STATUS, TEXT_STATUS } from '@/utils/constants'
import { switchLink } from '@/utils/common'
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
import MultiFile from '../multiFile'

import styles from './index.module.less'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'

interface IProps {
  editor: HTMLTextAreaElement | null // 编辑元素
  setShowToc: () => void // 修改目录展示状态
}

const Toolbar: React.FC<IProps> = ({ editor, setShowToc }) => {
  const { file, dispatch } = useFile()

  // 点击文字改变
  const clickTextStatus = (type: TEXT_STATUS) => {
    if (editor) {
      changeSelectTextStatus(editor, file.content, changeContent, type)
    }
  }

  // 点击行状态改变
  const clickLineStatus = (type: LINE_STATUS) => {
    if (editor) {
      changeSelectLineStatus(editor, file.content, changeContent, type)
    }
  }

  const changeContent = (val: string) => {
    dispatch({
      type: ACTION_TYPE.CHANGE_CONTENT,
      payload: val
    })
  }

  const CodeThemeMenu = useMemo(
    () => (
      <Menu
        onClick={({ key }) => {
          dispatch({
            type: ACTION_TYPE.CHANGE_STATE,
            payload: key
          })
        }}
        items={Object.values(CODE_THEME).map((val) => ({
          label: val,
          key: val
        }))}
        selectedKeys={[file.state.codeTheme]}
      />
    ),
    [file.state.codeTheme]
  )
  useEffect(() => {
    if (file.state.codeTheme) {
      switchLink(
        'code-style',
        `https://cdn.bootcdn.net/ajax/libs/highlight.js/11.6.0/styles/${file.state.codeTheme}.min.css`
      )
    }
  }, [file.state.codeTheme])

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
          if (editor) {
            addLink(editor, file.content, changeContent)
          }
        }}
      >
        <LinkIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editor) {
            addTable(editor, file.content, changeContent)
          }
        }}
      >
        <TableIcon />
      </div>
      <div
        className={styles.item}
        onClick={() => {
          if (editor) {
            addImage(editor, file.content, changeContent)
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
          sync scroll
        </Checkbox>
        <div onClick={() => setShowToc()} className={styles.item}>
          <TocIcon />
        </div>
        <MultiFile />
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
