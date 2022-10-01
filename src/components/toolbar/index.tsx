import React from 'react'
import {
  addImage,
  addLink,
  addTable,
  changeSelectLineStatus,
  changeSelectTextStatus
} from '@/utils/editor'
import { LINE_STATUS, TEXT_STATUS } from '@/utils/constants'
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
import ProjectPanel from '../projectPanel'
import ThemeIcon from '../icons/theme'
import CodeThemeIcon from '../icons/codeTheme'

interface IProps {
  editorRef: HTMLTextAreaElement | null
  mdStr: string
  setMdStr: (v: string) => void
}

const Toolbar: React.FC<IProps> = ({ editorRef, mdStr, setMdStr }) => {
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

  return (
    <div className="flex justify-between items-center">
      <ul
        className="menu menu-horizontal bg-base-100 rounded-box p-0 m-0"
        style={{ backgroundColor: '#256D85' }}
      >
        <li>
          <a onClick={() => clickTextStatus(TEXT_STATUS.STRONG)}>
            <BoldIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickTextStatus(TEXT_STATUS.DELETE)}>
            <DeleteIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickTextStatus(TEXT_STATUS.ITALIC)}>
            <ItalicIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickTextStatus(TEXT_STATUS.UNDERLINE)}>
            <UnderlineIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickLineStatus(LINE_STATUS.OL)}>
            <OlIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickLineStatus(LINE_STATUS.UL)}>
            <UlIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickLineStatus(LINE_STATUS.TODO)}>
            <TodoIcon />
          </a>
        </li>
        <li>
          <a onClick={() => clickLineStatus(LINE_STATUS.QUOTE)}>
            <QuoteIcon />
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              if (editorRef) {
                addLink(editorRef, mdStr, setMdStr)
              }
            }}
          >
            <LinkIcon />
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              if (editorRef) {
                addTable(editorRef, mdStr, setMdStr)
              }
            }}
          >
            <TableIcon />
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              if (editorRef) {
                addImage(editorRef, mdStr, setMdStr)
              }
            }}
          >
            <ImgIcon />
          </a>
        </li>
        <li>
          <a>
            <div className="dropdown">
              <label tabIndex={0} className="">
                <ThemeIcon />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </a>
        </li>
        <li>
          <a>
            <CodeThemeIcon />
          </a>
        </li>
      </ul>
      <ProjectPanel />
    </div>
  )
}

export default Toolbar
