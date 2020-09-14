const fs = require('fs')
const cmScripts = require('../assets/cmScripts.json')
const cmThemes = require('../assets/cmThemes.json')
const cmModes = require('../assets/cmModes.json')
const cmColors = require('../assets/cmColors.json')
const cmAddons = require('../assets/cmAddons.json')

const extractAddons = (addons) =>
  addons.reduce((acc, val) => acc + ';' + cmAddons[val], '')

const addons = ['closetag', 'closebrackets', 'matchbrackets']

function createHTML(theme, mode, addons) {
  // const detectedLang = hljs.highlightAuto(codeStr).language
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<script type="text/javascript">
  ${cmScripts.js}
</script>
<script type="text/javascript" async>
  ${cmModes[mode]}
</script>
<script type="text/javascript">
  ${addons}
</script>
<style type="text/css">
  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    color:${cmColors.color[theme]};
    background-color:${cmColors.backgroundColor[theme]};
  }
  ${cmScripts.css}
  ${cmThemes[theme]}
  .CodeMirror {
    font-size: 12pt;
    line-height: 1.6;
    width: 100%;
    height: 100%;
  }
</style>
<style type="text/css">
  ${cmAddons.dialog_css}
  ${cmAddons.fullscreen_css}
  ${cmAddons.foldgutter_css}
  ${cmAddons.show_hint_css}
  ${cmAddons.lint_css}
  ${cmAddons.merge_css}
  ${cmAddons.simplescrollbars_css}
  ${cmAddons.matchesonscrollbar_css}
  ${cmAddons.tern_css}
</style>
</head>
<body>
  <script>
  let cm = CodeMirror(document.body, {
    lineNumbers: true,
    tabSize: 2,
    autocapitalize: false,
    inputStyle: 'contenteditable',
    value: 'console.log("Hello, World");',
    theme: '${theme}',
    mode: '${mode}',
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true
  });
  </script>
</body>
</html>
`
}

fs.writeFile(
  './test.html',
  createHTML('eclipse', 'xml', extractAddons(addons)),
  () => {}
)
