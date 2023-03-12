import { MARKDOWN_STATE, setFileStorageData } from '@/utils/storage'
import { FileState } from './reducer'
import { CODE_THEME, VIEW_STATE } from '@/utils/constants'
import { MD, toc } from '@/utils/md'
import { DropInfo } from '@/components/multiFile'

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
  toc.clear()
  const htmlStr = MD.render(content)
  const newState = {
    ...oldState,
    content,
    htmlStr,
    titleList: toc.get()
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
  const newFileData = [...oldState.multiFileData]
  const keys = [key]

  while (keys.length) {
    const key = keys.shift()
    let index = -1
    newFileData.map((file, i) => {
      if (file.parent === key) {
        keys.push(file.key)
      } else if (file.key === key) {
        index = i
      }
    })
    if (index !== -1) {
      newFileData.splice(index, 1)
    }
  }

  const newState = {
    ...oldState,
    multiFileData: newFileData
  }
  setFileStorageData(newState.multiFileData, newState.curKey)
  return newState
}

/**
 * sort file
 */
export const sortFileAction = (oldState: FileState, dropInfo: DropInfo) => {
  const { node, dragNode, dropPosition } = dropInfo
  const newFileData = [...oldState.multiFileData]
  const nodeIndex = newFileData.findIndex(({ key }) => key === node.key)
  const dragIndex = newFileData.findIndex(({ key }) => key === dragNode.key)
  const cloneDrag = { ...newFileData[dragIndex] }
  let curKey = oldState.curKey

  if (nodeIndex !== -1 && dragIndex !== -1) {
    if (dragNode.parent !== node.parent) {
      const curLevelData = newFileData.filter(
        (data) => data.parent === node.parent
      )
      if (curLevelData.length > 0) {
        curLevelData.sort((a, b) => {
          const aKeys = a.key.split('-')
          const bKeys = b.key.split('-')
          return (
            Number(bKeys[bKeys.length - 1]) - Number(aKeys[aKeys.length - 1])
          )
        })
        const curLevelLastKey = curLevelData[0].key.split('-')

        const newDragKey = `${node.parent}-${
          Number(curLevelLastKey[curLevelLastKey.length - 1]) + 1
        }`

        const keys = [dragNode.key]
        while (keys.length) {
          const parentKey = keys.shift()
          const newParentKey = `${newDragKey}${parentKey?.substring(
            dragNode.key.length,
            parentKey.length
          )}`

          newFileData.forEach((file) => {
            if (file.parent === parentKey) {
              keys.push(file.key)
              file.parent = newParentKey
              const newFileKey = `${newDragKey}${file.key?.substring(
                dragNode.key.length,
                file.key.length
              )}`
              file.key = newFileKey
            }
          })
        }

        cloneDrag.key = newDragKey
        cloneDrag.parent = node.parent
        curKey = newDragKey
      }
    }

    const nodePosArr = node.pos.split('-')
    const position =
      dropPosition > Number(nodePosArr[nodePosArr.length - 1]) ? 1 : 0

    newFileData.splice(dragIndex, 1)
    newFileData.splice(nodeIndex + position, 0, cloneDrag)
  }

  const newState = {
    ...oldState,
    curKey,
    multiFileData: newFileData
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

/**
 * Change page layout state
 */
export const changeViewState = (oldState: FileState) => {
  let viewState = VIEW_STATE.ALL
  switch (oldState.viewState) {
    case VIEW_STATE.ALL:
      viewState = VIEW_STATE.EDITOR
      break
    case VIEW_STATE.EDITOR:
      viewState = VIEW_STATE.PREVIEW
      break
    case VIEW_STATE.PREVIEW:
      viewState = VIEW_STATE.ALL
      break
    default:
      break
  }
  const newState = {
    ...oldState,
    viewState
  }
  return newState
}
