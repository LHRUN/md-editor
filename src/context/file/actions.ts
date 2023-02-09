import { MARKDOWN_STATE, setFileStorageData } from '@/utils/storage'
import { FileState } from './reducer'
import { CODE_THEME } from '@/utils/constants'

/**
 * change markdown content
 */
export const changeContentAction = (oldState: FileState, content: string) => {
  const index = oldState.multiFileData.findIndex(
    (data) => data.key === oldState.curKey
  )
  if (index !== -1) {
    oldState.multiFileData[index].content = content
  }
  const newState = {
    ...oldState,
    content
  }
  setFileStorageData(newState.multiFileData, newState.curKey)
  return newState
}

/**
 * Change the current file selection
 */
export const changeCurKeyAction = (oldState: FileState, key: string) => {
  const index = oldState.multiFileData.findIndex((data) => data.key === key)
  if (index !== -1) {
    const { content = '', state = oldState.state } =
      oldState.multiFileData[index]
    const newState = {
      ...oldState,
      curKey: key,
      content,
      state
    }
    setFileStorageData(newState.multiFileData, newState.curKey)
    return newState
  }
  return oldState
}

/**
 * Changing markdown operate bar state
 */
export const changeStateAction = (
  oldState: FileState,
  markdownState: MARKDOWN_STATE
) => {
  const index = oldState.multiFileData.findIndex(
    (data) => data.key === oldState.curKey
  )
  if (index !== -1) {
    oldState.multiFileData[index].state = markdownState
  }
  const newState = {
    ...oldState,
    state: markdownState
  }
  setFileStorageData(newState.multiFileData, newState.curKey)
  return newState
}

/**
 * add file
 * @param oldState FileState
 * @param isLeaf is file
 * @param parent parent key
 * @returns FileState
 */
export const addFileAction = (
  oldState: FileState,
  isLeaf: boolean,
  parent: string
) => {
  const curLevelData = oldState.multiFileData.filter(
    (data) => data.parent === parent
  )
  let key = ''
  if (curLevelData.length > 0) {
    curLevelData.sort((a, b) => {
      const aKeys = a.key.split('-')
      const bKeys = b.key.split('-')
      return Number(bKeys[bKeys.length - 1]) - Number(aKeys[aKeys.length - 1])
    })
    const curLevelLastKey = curLevelData[0].key.split('-')
    key = `${parent}-${Number(curLevelLastKey[curLevelLastKey.length - 1]) + 1}`
  } else {
    key = `${parent}-0`
  }
  const newState = {
    ...oldState,
    multiFileData: [
      ...oldState.multiFileData,
      {
        title: 'empty',
        key,
        parent,
        content: '',
        isLeaf,
        state: {
          codeTheme: CODE_THEME.a11yDark
        }
      }
    ]
  }
  setFileStorageData(newState.multiFileData, newState.curKey)
  return newState
}

/**
 * delete file
 */
export const deleteFileAction = (oldState: FileState, key: string) => {
  const newState = {
    ...oldState,
    multiFileData: oldState.multiFileData.filter(
      (file) => file.key !== key && file.parent !== key
    )
  }
  setFileStorageData(newState.multiFileData, newState.curKey)
  return newState
}

/**
 * Change current file title
 */
export const changeFileTitleAction = (
  oldState: FileState,
  key: string,
  title: string
) => {
  console.log(title)
  const index = oldState.multiFileData.findIndex((data) => data.key === key)
  const newFileData = [...oldState.multiFileData]
  newFileData[index].title = title
  const newState = {
    ...oldState,
    multiFileData: newFileData
  }
  setFileStorageData(newState.multiFileData, newState.curKey)
  return newState
}
