import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MD, toc } from '@/utils/md'
import { storage, MD_CONTENT_KEY } from '@/utils/storage'
import { clearScrollMap, editorScroll, previewScroll } from '@/utils/scroll'
import { ITitle } from '@/utils/toc'
import { useResizeEvent } from '@/hooks/event'

import { Layout } from 'antd'
import Toolbar from '@/components/toolbar'
import styles from './index.module.less'

const { Header, Content } = Layout

const TEXTAREA_NODE_NAME = 'TEXTAREA'

const Editor: React.FC = () => {
  const [source, setSource] = useState('')
  useEffect(() => {
    const content = storage.get(MD_CONTENT_KEY)
    if (content) {
      setSource(content)
    }
  }, [])

  const editorRef = useRef<HTMLTextAreaElement>(null) // 编辑ref
  const previewRef = useRef<HTMLDivElement>(null) // 预览ref
  const [showToc, setShowToc] = useState(false) // 目录展示状态
  const [tocList, setTocList] = useState<ITitle[]>([]) // 目录

  useResizeEvent(clearScrollMap)

  /**
   * 获取转换后的html字符串，并获取目录
   */
  const htmlStr = useMemo(() => {
    toc.clear()
    const str = MD.render(source)
    setTocList(toc.get())
    return str
  }, [source])

  /**
   * 修改markdown内容
   * @param content
   */
  const changeMdContent = (content: string) => {
    storage.set(MD_CONTENT_KEY, content)
    setSource(content)
    clearScrollMap()
  }

  /**
   * 滚动监听
   * @param el
   */
  const scrollHandle = (el: HTMLInputElement) => {
    const nodeName = el.nodeName
    if (editorRef.current && previewRef.current) {
      if (nodeName === TEXTAREA_NODE_NAME) {
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
          editorRef={editorRef.current}
          source={source}
          setSource={changeMdContent}
          setShowToc={() => setShowToc((v) => !v)}
        />
      </Header>
      <Content>
        <div className={styles.container}>
          <textarea
            className={`${styles.content} ${styles.editorTextarea}`}
            ref={editorRef}
            value={source}
            onInput={(e) => {
              changeMdContent((e.target as HTMLInputElement).value)
            }}
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
              <div className={styles.tocTitle}>目录</div>
              <div>
                {tocList.map(({ val, level }, index) => {
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
