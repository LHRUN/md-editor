import { CODE_THEME } from './constants'
import { FileData, defaultMultiFileData } from './multiFile'

export const MD_CONTENT_KEY = 'MARKDOWN_CONTENT' // Used in v0.1.0, deprecated, markdown content key
export const MD_STATE_KEY = 'MARKDOWN_STATE' // Used in v0.1.0, deprecated, markdown state key
export const MD_FILE_KEY = 'MARKDOWN_FILE' // Used in v0.2.0, multi file key

export interface MARKDOWN_STATE {
  codeTheme: string
}

export interface STORAGE {
  fileData: FileData[]
  version: string
  currentKey: string
}

/**
 * localStorage
 */
export const storage = {
  /**
   * get storage
   * @param key localStorage key
   */
  get(key: string) {
    if (!key) {
      return null
    }
    key = key.toString()
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },

  /**
   * set storage
   * @param key localStorage key
   * @param value
   */
  set(key: string, value: unknown) {
    if (!key) {
      return null
    }
    localStorage.setItem(key.toString(), JSON.stringify(value))
  },

  /**
   * delete storage
   * @param key localStorage key
   */
  deleteKey(key: string) {
    if (!key) {
      return
    }
    key = key.toString()
    localStorage.removeItem(key)
  },

  /**
   * clear storage
   */
  clear() {
    localStorage.clear()
  }
}

/**
 * Historical data compatible
 * @returns { currentData, storageData }
 */
export const getFileStorageData = (): {
  currentData: FileData
  currentKey: string
  storageData: STORAGE
} => {
  // v0.1.0 Data Structure
  const content = storage.get(MD_CONTENT_KEY)
  const state = storage.get(MD_STATE_KEY)
  if (content || state) {
    const fileData = [
      {
        title: 'Learning',
        key: '0-0',
        parent: '0',
        content: content || '',
        isLeaf: true,
        state: state || {
          codeTheme: CODE_THEME.a11yDark
        }
      }
    ]
    storage.deleteKey(MD_CONTENT_KEY)
    storage.deleteKey(MD_STATE_KEY)
    const storageData = {
      fileData,
      version: import.meta.env.VERSION,
      currentKey: fileData[0].key
    }
    storage.set(MD_FILE_KEY, storageData)
    return {
      currentKey: storageData.currentKey,
      currentData: fileData[0],
      storageData
    }
  }

  // v0.2.0 Data Structure
  const fileStorage = storage.get(MD_FILE_KEY)
  if (fileStorage) {
    const { currentKey, fileData } = fileStorage
    const currentData = fileData.find(
      (data: FileData) => data.key === currentKey
    )
    return {
      currentKey,
      currentData,
      storageData: fileStorage
    }
  }

  // new User
  const storageData = {
    fileData: defaultMultiFileData,
    version: import.meta.env.VERSION,
    currentKey: '0-2'
  }
  const currentData = storageData.fileData.find(
    (data: FileData) => data.key === storageData.currentKey
  ) as FileData
  return {
    currentKey: storageData.currentKey,
    currentData,
    storageData
  }
}

export const setFileStorageData = (
  fileData: FileData[],
  currentKey: string
) => {
  storage.set(MD_FILE_KEY, {
    fileData,
    currentKey,
    version: import.meta.env.VERSION
  })
}
