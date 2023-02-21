import React, { useRef, useState } from 'react'
import { clearScrollMap, editorScroll, previewScroll } from '@/utils/scroll'
import { useResizeEvent } from '@/hooks/event'

import { Layout } from 'antd'
import Toolbar from '@/components/toolbar'
import styles from './index.module.less'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'
import editorbg from '@/assets/imgs/editorbg.png'
import { VIEW_STATE } from '@/utils/constants'
const { Header, Content } = Layout

let contentTimer: NodeJS.Timeout
const Editor: React.FC = () => {
  const { file, dispatch } = useFile()
  const [isInput, setIsInput] = useState(false)
  // const [viewState, setViewState] = useState(VIEW_STATE.PREVIEW)
  const editorRef = useRef<HTMLTextAreaElement>(null) // edit area ref
  const previewRef = useRef<HTMLDivElement>(null) // preview area ref
  const [showToc, setShowToc] = useState(false) // toc display

  useResizeEvent(clearScrollMap)

  /**
   * change markdown content
   * @param content
   */
  const changeMdContent = (content: string) => {
    dispatch({
      type: ACTION_TYPE.CHANGE_CONTENT,
      payload: content
    })
    clearScrollMap()
    setIsInput(true)
    contentTimer && clearTimeout(contentTimer)
    contentTimer = setTimeout(() => {
      setIsInput(false)
    }, 50)
  }

  /**
   * scroll listening
   * @param el
   */
  const scrollHandle = (el: HTMLInputElement) => {
    const nodeName = el.nodeName
    if (editorRef.current && previewRef.current) {
      if (nodeName === 'TEXTAREA') {
        editorScroll(editorRef.current, previewRef.current)
      } else if (nodeName === 'DIV') {
        const { scrollHeight, scrollTop, clientHeight } = editorRef.current
        if (isInput && scrollHeight - clientHeight < scrollTop + 6) {
          previewRef.current.scrollTop = previewRef.current.scrollHeight
        } else {
          previewScroll(editorRef.current, previewRef.current)
        }
      }
    }
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.layoutHeader}>
        <Toolbar
          editor={editorRef.current}
          setShowToc={() => setShowToc((v) => !v)}
        />
      </Header>
      <Content>
        <div className={styles.container}>
          {(file.viewState === VIEW_STATE.ALL ||
            file.viewState === VIEW_STATE.EDITOR) && (
            <textarea
              className={`${styles.content} ${styles.editorTextarea}`}
              ref={editorRef}
              value={file.content}
              onInput={(e) => {
                changeMdContent((e.target as HTMLInputElement).value)
              }}
              style={{ backgroundImage: `url(${editorbg})` }}
              onScroll={(e) => scrollHandle(e.target as HTMLInputElement)}
            ></textarea>
          )}
          {(file.viewState === VIEW_STATE.ALL ||
            file.viewState === VIEW_STATE.PREVIEW) && (
            <div
              id="write"
              ref={previewRef}
              className={`${styles.content} ${styles.write}`}
              dangerouslySetInnerHTML={{ __html: file.htmlStr }}
              onScroll={(e) => scrollHandle(e.target as HTMLInputElement)}
            ></div>
          )}

          {showToc && (
            <div className={styles.toc}>
              <div className={styles.tocTitle}>TOC</div>
              <div>
                {file.titleList.map(({ val, level }, index) => {
                  const fontSize = ((7 - level) / 10) * 40

                  return (
                    <div
                      style={{
                        marginLeft: `${level * 10}px`,
                        fontSize: `${fontSize > 12 ? fontSize : 12}px`
                      }}
                      key={index}
                    >
                      {val}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default Editor
