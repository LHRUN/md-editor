import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MD } from '@/utils/md'
import { SCROLL_SCOPE } from '@/utils/constants'
import { storage, MD_CONTENT_KEY } from '@/utils/storage'

import { Layout, Col, Row } from 'antd'
import Toolbar from '@/components/toolbar'
import styles from './index.module.less'

const { Header, Content } = Layout

let scrollEl = SCROLL_SCOPE.NULL // 当前滚动元素
let scrollTimer: NodeJS.Timeout
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
  const htmlStr = useMemo(() => MD.render(source), [source])

  const changeMdContent = (content: string) => {
    storage.set(MD_CONTENT_KEY, content)
    setSource(content)
  }

  const scrollHandle = (el: HTMLInputElement) => {
    const nodeName = el.nodeName
    if (nodeName === TEXTAREA_NODE_NAME) {
      if (scrollEl === SCROLL_SCOPE.PREVIEW) {
        return
      }
      scrollEl = SCROLL_SCOPE.EDITOR
      syncScroll(
        editorRef.current as HTMLTextAreaElement,
        previewRef.current as HTMLDivElement
      )
      // const scrollMap = buildScrollMap(
      //   editorRef.current as HTMLTextAreaElement,
      //   previewRef.current as HTMLDivElement
      // )

      // const lineNo = Math.floor(editorRef.current?.scrollTop / 24)
      // const posTo = scrollMap[lineNo]
      // console.log(scrollMap, posTo, lineNo)
      // previewRef.current.scrollTo({ top: posTo })
    } else {
      if (scrollEl === SCROLL_SCOPE.EDITOR) {
        return
      }
      scrollEl = SCROLL_SCOPE.PREVIEW
      syncScroll(
        previewRef.current as HTMLDivElement,
        editorRef.current as HTMLTextAreaElement
      )

      // const scrollMap = buildScrollMap(
      //   editorRef.current as HTMLTextAreaElement,
      //   previewRef.current as HTMLDivElement
      // )

      // const lines = Object.keys(scrollMap)

      // if (lines.length < 1) {
      //   return
      // }

      // let line = lines[0]

      // for (let i = 1; i < lines.length; i++) {
      //   if (scrollMap[lines[i]] < previewRef.current?.scrollTop) {
      //     line = lines[i]
      //     continue
      //   }

      //   break
      // }

      // editorRef.current.scrollTo({ top: 24 * line })
    }
  }

  const syncScroll = (active: HTMLElement, sync: HTMLElement) => {
    const top = (active.scrollTop / active.scrollHeight) * sync.scrollHeight
    sync.scrollTo({
      top
    })
    scrollTimer = setTimeout(() => {
      scrollEl = SCROLL_SCOPE.NULL
      clearTimeout(scrollTimer)
    }, 100)
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.layoutHeader}>
        <Toolbar
          editorRef={editorRef.current}
          source={source}
          setSource={changeMdContent}
        />
      </Header>
      <Content>
        <Row>
          <Col style={{ height: '100%' }} span={12}>
            <textarea
              className={`${styles.content} ${styles.editorTextarea}`}
              ref={editorRef}
              value={source}
              onInput={(e) => {
                changeMdContent((e.target as HTMLInputElement).value)
              }}
              onScroll={(e) => scrollHandle(e.target as HTMLInputElement)}
            ></textarea>
          </Col>
          <Col style={{ height: '100%' }} span={12}>
            <div
              id="write"
              ref={previewRef}
              className={`${styles.content} ${styles.write}`}
              dangerouslySetInnerHTML={{ __html: htmlStr }}
              onScroll={(e) => scrollHandle(e.target as HTMLInputElement)}
            ></div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Editor
