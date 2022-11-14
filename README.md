<h1 align="center">md-editor</h1>
<div align="center">

  md-editor is a markdown-it based markdown editor

</div>

## Preview

Link: [https://songlh.top/md-editor/](https://songlh.top/md-editor/)

![](https://s1.ax1x.com/2022/10/12/xaMejs.jpg)

## Document

[基于markdown-it打造的markdown编辑器](https://songlh.top/2022/10/12/%E5%9F%BA%E4%BA%8Emarkdown-it%E6%89%93%E9%80%A0%E7%9A%84markdown%E7%BC%96%E8%BE%91%E5%99%A8/)

## Features
- [x] Menu Edit Button
- [x] Code Block Theme Switch
- [x] Sync scrolling
- [x] Generate toc list
- [x] Content state local cache

## Getting Started
```
git clone https://github.com/LHRUN/md-editor.git
pnpm install
pnpm run dev
```

## File List
```js
├─components        
│  └─icons
│  └─toolbar // Top Menu
├─hooks
│  event.ts // event hook
├─views
│  └─editor // editor page
└─utils
  │  constants
  │  common
  │  editor // editor utils
  │  md // markdown-it instance
  │  scroll // sync scroll
  │  storage // local cache
  │  toc
```
