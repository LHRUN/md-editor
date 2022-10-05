import React, { useMemo, useRef, useState } from 'react'
import { MD } from '@/utils/md'

import { Layout, Col, Row } from 'antd'
import Toolbar from '@/components/toolbar'

import styles from './index.module.less'

const { Header, Content } = Layout

const Editor: React.FC = () => {
  const [mdStr, setMdStr] = useState('')
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const htmlStr = useMemo(() => MD.render(mdStr), [mdStr])

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
          <Col span={12}>
            <textarea
              className={styles.editorTextarea}
              ref={editorRef}
              value={mdStr}
              onInput={(e) => {
                setMdStr((e.target as HTMLInputElement).value)
              }}
            ></textarea>
          </Col>
          <Col span={12}>
            <div
              id="write"
              className={styles.write}
              dangerouslySetInnerHTML={{ __html: htmlStr }}
            ></div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Editor
