import { CODE_THEME } from '@/utils/constants'
import { FileData } from '@/utils/multiFile'
import { MARKDOWN_STATE } from '@/utils/storage'
import {
  addFileAction,
  changeCurKeyAction,
  changeFileTitleAction,
  changeContentAction,
  changeStateAction,
  deleteFileAction
} from './actions'

export interface FileState {
  content: string
  state: MARKDOWN_STATE
  curKey: string
  multiFileData: FileData[]
}

export interface FileAction {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export type FileReducer = (state: FileState, action: FileAction) => FileState

export const ACTION_TYPE = {
  CHANGE_CONTENT: 'changeContent',
  CHANGE_CUR_KEY: 'changeCurKey',
  CHANGE_STATE: 'changeState',
  ADD_FILE: 'addFile',
  DELTE_FILE: 'deleteFile',
  CHANGE_FILE_TITLE: 'changeFileTitle'
}

export const fileInitState: FileState = {
  content: '',
  state: {
    codeTheme: CODE_THEME.a11yDark
  },
  curKey: '',
  multiFileData: []
}

export const fileReducer: FileReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_CONTENT:
      return changeContentAction(state, action.payload)
    case ACTION_TYPE.CHANGE_CUR_KEY:
      return changeCurKeyAction(state, action.payload)
    case ACTION_TYPE.CHANGE_STATE:
      return changeStateAction(state, action.payload)
    case ACTION_TYPE.ADD_FILE:
      return addFileAction(state, action.payload.isLeaf, action.payload.parent)
    case ACTION_TYPE.DELTE_FILE:
      return deleteFileAction(state, action.payload)
    case ACTION_TYPE.CHANGE_FILE_TITLE:
      return changeFileTitleAction(
        state,
        action.payload.key,
        action.payload.title
      )
    default:
      return state
  }
}
