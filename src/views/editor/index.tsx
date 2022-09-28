import React, { useMemo, useRef, useState } from 'react'
import { MD } from '@/utils/md'
import Toolbar from '@/components/toolbar'

const Editor: React.FC = () => {
  const [mdStr, setMdStr] = useState('')
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const htmlStr = useMemo(() => MD.render(mdStr), [mdStr])

  return (
    <>
      <Toolbar
        editorRef={editorRef.current}
        mdStr={mdStr}
        setMdStr={setMdStr}
      />
      <div className="flex h-screen">
        <textarea
          ref={editorRef}
          value={mdStr}
          onInput={(e) => {
            setMdStr((e.target as HTMLInputElement).value)
          }}
          className="resize-none h-full w-3/6"
        ></textarea>
        <div
          className="h-full w-3/6"
          dangerouslySetInnerHTML={{ __html: htmlStr }}
        ></div>
      </div>
    </>
  )
}

export default Editor
