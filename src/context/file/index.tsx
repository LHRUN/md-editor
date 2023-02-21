import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'
import { FileAction, FileReducer, fileReducer, FileState } from './reducer'
import { getFileStorageData } from '@/utils/storage'
import { MD, toc } from '@/utils/md'
import { VIEW_STATE } from '@/utils/constants'

const FileContext = createContext<{
  file: FileState
  dispatch: Dispatch<FileAction>
} | null>(null)
FileContext.displayName = 'FileContext'

const fileInitState = getFileStorageData()
export const FileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [file, dispatch] = useReducer<FileReducer>(fileReducer, {
    content: fileInitState.currentData.content,
    htmlStr: MD.render(fileInitState.currentData.content),
    viewState: VIEW_STATE.ALL,
    titleList: toc.get(),
    state: fileInitState.currentData.state,
    curKey: fileInitState.currentKey,
    multiFileData: fileInitState.storageData.fileData
  })

  return (
    <FileContext.Provider value={{ file, dispatch }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFile = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFile must be used in FileProvider')
  }
  return context
}
