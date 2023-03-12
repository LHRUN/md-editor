<h1 align="center">md-editor</h1>
<div align="center">

  md-editor is a markdown-it based markdown editor

</div>

## Preview

Link: [https://songlh.top/md-editor/](https://songlh.top/md-editor/)

![](https://s1.ax1x.com/2023/02/14/pST4lJP.png)
<!-- <div align="left">
   <img src="https://s1.ax1x.com/2023/02/07/pS2MWff.png"  height=340>
   <img src="https://s1.ax1x.com/2023/02/07/pS2MRtP.png" height=340>
</div> -->

## Document

[基于markdown-it打造的markdown编辑器](https://songlh.top/2022/10/12/%E5%9F%BA%E4%BA%8Emarkdown-it%E6%89%93%E9%80%A0%E7%9A%84markdown%E7%BC%96%E8%BE%91%E5%99%A8/)

## Features
- [x] Menu Edit Button
- [x] Code Block Theme Switch
- [x] Sync scrolling
- [x] Generate toc list
- [x] Content state local cache
- [x] Multi file tree records
- [x] Download and upload file
- [x] Support UML and Katex syntax

## Getting Started
```
git clone https://github.com/LHRUN/md-editor.git
pnpm install
pnpm dev
```

## File List
```js
├─components        
│  ├─icons
│  ├─multiFile // Multi file drawer
│  └─toolbar // Top Menu
│
├─context        
│  ├─file // multi file provider
│  └─index // app provider
│
├─hooks
│  └─event.ts // event hook
│
├─views
│  └─editor // editor page
│
└─utils
   ├─constants
   ├─common
   ├─editor // editor utils
   ├─md // markdown-it instance
   ├─scroll // sync scroll
   ├─storage // local cache
   ├─multiFile
   └─toc
```
