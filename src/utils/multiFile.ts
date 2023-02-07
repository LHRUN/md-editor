import { CODE_THEME } from '@/utils/constants'
import { MARKDOWN_STATE } from '@/utils/storage'

export const TREE_ROOT_KEY = '0'

export interface FileData {
  title: string
  key: string
  parent: string
  content: string
  state: MARKDOWN_STATE
  isLeaf: boolean
  children?: FileData[]
}

export const defaultMultiFileData: FileData[] = [
  {
    title: 'Learning',
    key: '0-0',
    parent: '0',
    content: '',
    isLeaf: false,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'empty',
    key: '0-0-0',
    parent: '0-0',
    content: '',
    isLeaf: true,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'Work',
    key: '0-1',
    parent: '0',
    content: '',
    isLeaf: false,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'empty',
    key: '0-1-0',
    parent: '0-1',
    content: '',
    isLeaf: true,
    state: {
      codeTheme: CODE_THEME.a11yDark
    }
  },
  {
    title: 'Demo',
    key: '0-2',
    parent: '0',
    content: `| name | code |
| --- | --- |
| Stephon Song| 1 |
\`\`\`js
const name = 'Stephon Song'
const code = 1
\`\`\`
****
# level1
## level2
### level3
#### level4
##### level5
###### level6
****
**BOLD**
~~DELETE~~
_ITALIC_
<u>UNDERLINE<u>
+ 1
    - 1.1
+ 2

[md-editor](https://github.com/LHRUN/md-editor)
- [x] Menu Edit Button
- [x] Code Block Theme Switch
- [x] Sync scrolling
- [x] Generate toc list
- [x] Content state local cache
- [x] Multi file tree records
- [x] Download and upload file`,
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
