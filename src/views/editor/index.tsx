import React, { useMemo, useRef, useState } from 'react'
import { MD } from '@/utils/md'
import Toolbar from '@/components/toolbar'

const Editor: React.FC = () => {
  const [mdStr, setMdStr] = useState('')
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const htmlStr = useMemo(() => MD.render(mdStr), [mdStr])

  return (
    <div>
      <Toolbar
        editorRef={editorRef.current}
        mdStr={mdStr}
        setMdStr={setMdStr}
      />
      <div className="flex mt-1" style={{ height: '90vh' }}>
        <textarea
          ref={editorRef}
          value={mdStr}
          onInput={(e) => {
            setMdStr((e.target as HTMLInputElement).value)
          }}
          className="textarea resize-none h-full w-3/6"
          style={{ border: 'solid 1px #256D85' }}
        ></textarea>
        <div
          className="w-3/6 h-full break-all overflow-scroll border-box"
          dangerouslySetInnerHTML={{ __html: htmlStr }}
        ></div>
      </div>
    </div>
  )
}

export default Editor
