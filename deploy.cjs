// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const ghpages = require('gh-pages')

ghpages.publish(
  'dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/LHRUN/md-editor.git'
  },
  function (err) {
    console.log(err)
  }
)
