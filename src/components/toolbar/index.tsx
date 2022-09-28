import React from 'react'
import { changeSelectLineStatus, changeSelectTextStatus } from '@/utils/editor'
import { LINE_STATUS, TEXT_STATUS } from '@/utils/constants'

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
    <>
      <div onClick={() => clickTextStatus(TEXT_STATUS.STRONG)}>**</div>
      <div onClick={() => clickTextStatus(TEXT_STATUS.DELETE)}>~~</div>
      <div onClick={() => clickTextStatus(TEXT_STATUS.ITALIC)}>_</div>
      <div onClick={() => clickTextStatus(TEXT_STATUS.UNDERLINE)}>{`<u>`}</div>
      <div onClick={() => clickLineStatus(LINE_STATUS.OL)}>ol</div>
      <div onClick={() => clickLineStatus(LINE_STATUS.UL)}>ul</div>
      <div onClick={() => clickLineStatus(LINE_STATUS.TODO)}>todo</div>
    </>
  )
}

export default Toolbar
