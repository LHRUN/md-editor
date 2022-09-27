import React, { useMemo, useState } from 'react'
import MarkdownIt from 'markdown-it'

const MD = new MarkdownIt()

const Editor: React.FC = () => {
  const [mdVal, setMdVal] = useState('')
  const htmlStr = useMemo(() => {
    const val = MD.render(mdVal)
    console.log(val)
    return val
  }, [mdVal])

  return (
    <div className="flex h-screen">
      <textarea
        value={mdVal}
        onInput={(e) => {
          setMdVal((e.target as HTMLInputElement).value)
        }}
        className="resize-none h-full w-3/6"
      ></textarea>
      <div
        className="h-full w-3/6"
        dangerouslySetInnerHTML={{ __html: htmlStr }}
      ></div>
    </div>
  )
}

export default Editor
