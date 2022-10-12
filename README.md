## md-editor
+ md-editor是一款基于markdown-it的markdown编辑器

### 本地启动
```
git clone https://github.com/LHRUN/md-editor.git
pnpm install
pnpm run dev
```

### 目录结构
```js
├─components        
│  └─icons
│  └─toolbar // 顶部工具栏
├─hooks
│  event.ts // event hook
├─views
│  └─editor // 编辑页
└─utils
  │  constants
  │  common
  │  editor // 编辑处理
  │  md // 处理markdown-it
  │  scroll // 滚动处理
  │  storage // 缓存处理
  |  toc // 目录处理
```
