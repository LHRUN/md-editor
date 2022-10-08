import React, { useMemo, useRef, useState } from 'react'
import { MD } from '@/utils/md'
import { SCROLL_SCOPE } from '@/utils/constants'

import { Layout, Col, Row } from 'antd'
import Toolbar from '@/components/toolbar'
import styles from './index.module.less'

const { Header, Content } = Layout

let scrollEl = SCROLL_SCOPE.NULL
const TEXTAREA_NODE_NAME = 'TEXTAREA'

const Editor: React.FC = () => {
  const [mdStr, setMdStr] = useState('')
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const htmlStr = useMemo(() => MD.render(mdStr), [mdStr])

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
    } else {
      if (scrollEl === SCROLL_SCOPE.EDITOR) {
        return
      }
      scrollEl = SCROLL_SCOPE.PREVIEW
      syncScroll(
        previewRef.current as HTMLDivElement,
        editorRef.current as HTMLTextAreaElement
      )
    }
  }

  const syncScroll = (active: HTMLElement, sync: HTMLElement) => {
    const top = (active.scrollTop / active.scrollHeight) * sync.scrollHeight
    sync.scrollTo({
      top
    })
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.layoutHeader}>
        <Toolbar
          editorRef={editorRef.current}
          mdStr={mdStr}
          setMdStr={setMdStr}
        />
      </Header>
      <Content>
        <Row>
          <Col style={{ height: '100%' }} span={12}>
            <textarea
              className={`${styles.content} ${styles.editorTextarea}`}
              ref={editorRef}
              value={mdStr}
              onInput={(e) => {
                setMdStr((e.target as HTMLInputElement).value)
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
