export enum TEXT_STATUS {
  STRONG,
  DELETE,
  ITALIC,
  UNDERLINE
}

export const textStatusObj = {
  [TEXT_STATUS.STRONG]: {
    desc: 'STRONG',
    symbol: '**'
  },
  [TEXT_STATUS.DELETE]: {
    desc: 'DELETE',
    symbol: '~~'
  },
  [TEXT_STATUS.ITALIC]: {
    desc: 'ITALIC',
    symbol: '_'
  },
  [TEXT_STATUS.UNDERLINE]: {
    desc: 'UNDERLINE',
    symbol: '<u>'
  }
}

// Current line status
export enum LINE_STATUS {
  UL, // Unordered List
  OL, // Ordered List
  TODO, // Task List
  QUOTE // Quote
}

export const lineStatusObj = {
  [LINE_STATUS.UL]: {
    desc: 'UL',
    symbol: '- '
  },
  [LINE_STATUS.OL]: {
    desc: 'OL',
    symbol: '1. '
  },
  [LINE_STATUS.TODO]: {
    desc: 'TODO',
    symbol: '- [x] '
  },
  [LINE_STATUS.QUOTE]: {
    desc: 'QUOTE',
    symbol: '> '
  }
}

// Code block theme
export const CODE_THEME = {
  a11yDark: 'a11y-dark',
  a11yLight: 'a11y-light',
  agate: 'agate',
  anOldHope: 'an-old-hope',
  androidstudio: 'androidstudio',
  arduinoLight: 'arduino-light',
  arta: 'arta',
  ascetic: 'ascetic',
  atomOneDarkReasonable: 'atom-one-dark-reasonable',
  atomOneDark: 'atom-one-dark',
  atomOneLight: 'atom-one-light',
  brownPaper: 'brown-paper',
  codepenEmbed: 'codepen-embed',
  colorBrewer: 'color-brewer',
  dark: 'dark',
  default: 'default',
  devibeans: 'devibeans',
  docco: 'docco',
  far: 'far',
  felipec: 'felipec',
  foundation: 'foundation',
  githubDarkDimmed: 'github-dark-dimmed',
  githubDark: 'github-dark',
  github: 'github',
  gml: 'gml',
  googlecode: 'googlecode',
  gradientDark: 'gradient-dark',
  gradientLight: 'gradient-light',
  grayscale: 'grayscale',
  hybrid: 'hybrid',
  idea: 'idea',
  intellijLight: 'intellij-light',
  irBlack: 'ir-black',
  isblEditorDark: 'isbl-editor-dark',
  isblEditorLight: 'isbl-editor-light',
  kimbieDark: 'kimbie-dark',
  kimbieLight: 'kimbie-light',
  lightfair: 'lightfair',
  lioshi: 'lioshi',
  magula: 'magula',
  monoBlue: 'mono-blue',
  monokaiSublime: 'monokai-sublime',
  monokai: 'monokai',
  nightOwl: 'night-owl',
  nnfxDark: 'nnfx-dark',
  nnfxLight: 'nnfx-light',
  nord: 'nord',
  obsidian: 'obsidian',
  pandaSyntaxDark: 'panda-syntax-dark',
  pandaSyntaxLight: 'panda-syntax-light',
  paraisoDark: 'paraiso-dark',
  paraisoLight: 'paraiso-light',
  pojoaque: 'pojoaque',
  purebasic: 'purebasic',
  qtcreatorDark: 'qtcreator-dark',
  qtcreatorLight: 'qtcreator-light',
  rainbow: 'rainbow',
  routeros: 'routeros',
  schoolBook: 'school-book',
  shadesOfPurple: 'shades-of-purple',
  srcery: 'srcery',
  stackoverflowDark: 'stackoverflow-dark',
  stackoverflowLight: 'stackoverflow-light',
  sunburst: 'sunburst',
  tokyoNightDark: 'tokyo-night-dark',
  tokyoNightLight: 'tokyo-night-light',
  tomorrowNightBlue: 'tomorrow-night-blue',
  tomorrowNightBright: 'tomorrow-night-bright',
  vs: 'vs',
  vs2015: 'vs2015',
  xcode: 'xcode',
  xt256: 'st256'
}

export enum SCROLL_SCOPE {
  NULL,
  EDITOR,
  PREVIEW
}

export enum VIEW_STATE {
  PREVIEW,
  EDITOR,
  ALL
}
