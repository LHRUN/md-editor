import React, { useMemo, useRef, useState } from 'react'
import { MD, toc } from '@/utils/md'
import { clearScrollMap, editorScroll, previewScroll } from '@/utils/scroll'
import { ITitle } from '@/utils/toc'
import { useResizeEvent } from '@/hooks/event'

import { Layout } from 'antd'
import Toolbar from '@/components/toolbar'
import styles from './index.module.less'
import { useFile } from '@/context/file'
import { ACTION_TYPE } from '@/context/file/reducer'
import editorbg from '@/assets/imgs/editorbg.png'
const { Header, Content } = Layout

const Editor: React.FC = () => {
  const { file, dispatch } = useFile()
  const editorRef = useRef<HTMLTextAreaElement>(null) // edit area ref
  const previewRef = useRef<HTMLDivElement>(null) // preview area ref
  const [showToc, setShowToc] = useState(false) // toc display
  const [titleList, setTitleList] = useState<ITitle[]>([]) // title list

  useResizeEvent(clearScrollMap)

  /**
   * Get the converted html string and get the title list
   */
  const htmlStr = useMemo(() => {
    toc.clear()
    const str = MD.render(file.content)
    setTitleList(toc.get())
    return str
  }, [file.content])

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
      } else {
        previewScroll(editorRef.current, previewRef.current)
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
          <div
            id="write"
            ref={previewRef}
            className={`${styles.content} ${styles.write}`}
            dangerouslySetInnerHTML={{ __html: htmlStr }}
            onScroll={(e) => scrollHandle(e.target as HTMLInputElement)}
          ></div>
          {showToc && (
            <div className={styles.toc}>
              <div className={styles.tocTitle}>TOC</div>
              <div>
                {titleList.map(({ val, level }, index) => {
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
