import { CODE_THEME } from '@/utils/constants'
import { MARKDOWN_STATE } from '@/utils/storage'

export const TREE_ROOT_KEY = '0'

export interface FileData {
  title: string
  key: string
  parent: string
  source?: string
  state?: MARKDOWN_STATE
  isLeaf: boolean
  children?: FileData[]
}

export const defaultMultiFileData = [
  {
    title: 'Learning',
    key: '0-0',
    parent: '0',
    source: '',
    isLeaf: false,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'empty',
    key: '0-0-0',
    parent: '0-0',
    source: '',
    isLeaf: true,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'Work',
    key: '0-1',
    parent: '0',
    source: '',
    isLeaf: false,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'empty',
    key: '0-1-0',
    parent: '0-1',
    source: '',
    isLeaf: true,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'Demo',
    key: '0-2',
    parent: '0',
    source: '',
    isLeaf: true,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  }
]

/**
 * Arrays to tree structures
 * @param arr
 * @param parentId
 * @returns
 */
export const arrToTree = (arr: FileData[], parent = TREE_ROOT_KEY) => {
  return arr
    .filter((item) => item.parent === parent)
    .map((item) => {
      item.children = arrToTree(arr, item.key)
      return item
    })
}
