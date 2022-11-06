## md-editor
md-editor是一款基于markdown-it的markdown编辑器

![](https://s1.ax1x.com/2022/10/12/xaMejs.jpg)
+ 预览地址：[https://songlh.top/md-editor/](https://songlh.top/md-editor/)
+ 实现思路：[基于markdown-it打造的markdown编辑器](https://songlh.top/2022/10/12/%E5%9F%BA%E4%BA%8Emarkdown-it%E6%89%93%E9%80%A0%E7%9A%84markdown%E7%BC%96%E8%BE%91%E5%99%A8/)
+ 目前已完成功能：
- [x] 快捷编辑按钮
- [x] 代码块主题切换
- [x] 同步滚动
- [x] 目录列表生成
- [x] 内容状态缓存

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
  │  toc // 目录处理
```
