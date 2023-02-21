import React, { useEffect, useMemo } from 'react'
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
  TEXT_STATUS,
  VIEW_STATE
} from '@/utils/constants'
import { switchLink } from '@/utils/common'
import { changeSyncScroll } from '@/utils/scroll'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'
import { lineConfig, textConfig } from './config'

import { Checkbox, Dropdown, Menu } from 'antd'
import LinkIcon from '../icons/link'
import TableIcon from '../icons/table'
import ImgIcon from '../icons/img'
import TocIcon from '../icons/toc'
import GithubIcon from '../icons/github'
import ThemeIcon from '../icons/theme'
import MultiFile from '../multiFile'

import styles from './index.module.less'
import EditViewIcon from '../icons/editView'
import ColumnIcon from '../icons/column'
import PreviewIcon from '../icons/preview'

interface IProps {
  editor: HTMLTextAreaElement | null // editor element
  setShowToc: () => void // Change toc display status
}

const Toolbar: React.FC<IProps> = ({ editor, setShowToc }) => {
  const { file, dispatch } = useFile()

  // Click text to change
  const clickTextStatus = (type: TEXT_STATUS) => {
    if (editor) {
      changeSelectTextStatus(editor, file.content, changeContent, type)
    }
  }

  // Click line to change
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
      {textConfig.map(({ icon, status }) => (
        <div
          key={status}
          className={styles.item}
          onClick={() => clickTextStatus(status)}
        >
          {icon}
        </div>
      ))}
      {lineConfig.map(({ icon, status }) => (
        <div
          key={status}
          className={styles.item}
          onClick={() => clickLineStatus(status)}
        >
          {icon}
        </div>
      ))}
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
        <div
          onClick={() => dispatch({ type: ACTION_TYPE.CHANGE_VIEW_STATE })}
          className={styles.item}
        >
          {file.viewState === VIEW_STATE.EDITOR && <EditViewIcon />}
          {file.viewState === VIEW_STATE.ALL && <ColumnIcon />}
          {file.viewState === VIEW_STATE.PREVIEW && <PreviewIcon />}
        </div>
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
