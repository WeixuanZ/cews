const fs = require('fs')
const glob = require('glob')
const path = require('path')
const UglifyJS = require('uglify-js')
const UglifyCSS = require('uglifycss')

const writeJSON = (path, obj, successMsg) => {
  fs.writeFile(path, JSON.stringify(obj), (err) => {
    err ? console.log(err) : console.log(successMsg)
  })
}

const writeCode = (path) => {
  if (path.substr(path.length - 3) == 'css') {
    return UglifyCSS.processFiles([path], {
      maxLineLen: 500,
      expandVars: true
    })
  }
  return UglifyJS.minify(
    fs.readFileSync(path, 'utf8', (err) => {
      if (err) console.log(`${err}\nError finding file`)
    })
  ).code
}

var buiildPattern = {}

const modules = {
  comment: 'node_modules/codemirror/addon/comment/comment.js',
  continuecomment: 'node_modules/codemirror/addon/comment/continuecomment.js',
  dialog: 'node_modules/codemirror/addon/dialog/dialog.js',
  dialogCSS: 'node_modules/codemirror/addon/dialog/dialog.css',
  autorefresh: 'node_modules/codemirror/addon/display/autorefresh.js',
  fullscreenCSS: 'node_modules/codemirror/addon/display/fullscreen.css',
  fullscreen: 'node_modules/codemirror/addon/display/fullscreen.js',
  panel: 'node_modules/codemirror/addon/display/panel.js',
  placeholder: 'node_modules/codemirror/addon/display/placeholder.js',
  rulers: 'node_modules/codemirror/addon/display/rulers.js',
  xml_fold: 'node_modules/codemirror/addon/fold/xml-fold.js',
  closebrackets: 'node_modules/codemirror/addon/edit/closebrackets.js',
  closetag: 'node_modules/codemirror/addon/edit/closetag.js',
  continuelist: 'node_modules/codemirror/addon/edit/continuelist.js',
  matchbrackets: 'node_modules/codemirror/addon/edit/matchbrackets.js',
  matchtags: 'node_modules/codemirror/addon/edit/matchtags.js',
  trailingspace: 'node_modules/codemirror/addon/edit/trailingspace.js',
  brace_fold: 'node_modules/codemirror/addon/fold/brace-fold.js',
  comment_fold: 'node_modules/codemirror/addon/fold/comment-fold.js',
  foldcode: 'node_modules/codemirror/addon/fold/foldcode.js',
  foldgutterCSS: 'node_modules/codemirror/addon/fold/foldgutter.css',
  foldgutter: 'node_modules/codemirror/addon/fold/foldgutter.js',
  indent_fold: 'node_modules/codemirror/addon/fold/indent-fold.js',
  markdown_fold: 'node_modules/codemirror/addon/fold/markdown-fold.js',
  anyword_hint: 'node_modules/codemirror/addon/hint/anyword-hint.js',
  css_hint: 'node_modules/codemirror/addon/hint/css-hint.js',
  html_hint: 'node_modules/codemirror/addon/hint/html-hint.js',
  javascript_hint: 'node_modules/codemirror/addon/hint/javascript-hint.js',
  show_hintCSS: 'node_modules/codemirror/addon/hint/show-hint.css',
  show_hint: 'node_modules/codemirror/addon/hint/show-hint.js',
  sql_hint: 'node_modules/codemirror/addon/hint/sql-hint.js',
  xml_hint: 'node_modules/codemirror/addon/hint/xml-hint.js',
  coffeescript_lint: 'node_modules/codemirror/addon/lint/coffeescript-lint.js',
  css_lint: 'node_modules/codemirror/addon/lint/css-lint.js',
  html_lint: 'node_modules/codemirror/addon/lint/html-lint.js',
  javascript_lint: 'node_modules/codemirror/addon/lint/javascript-lint.js',
  json_lint: 'node_modules/codemirror/addon/lint/json-lint.js',
  lintCSS: 'node_modules/codemirror/addon/lint/lint.css',
  lint: 'node_modules/codemirror/addon/lint/lint.js',
  yaml_lint: 'node_modules/codemirror/addon/lint/yaml-lint.js',
  mergeCSS: 'node_modules/codemirror/addon/merge/merge.css',
  merge: 'node_modules/codemirror/addon/merge/merge.js',
  loadmode: 'node_modules/codemirror/addon/mode/loadmode.js',
  multiplex_test: 'node_modules/codemirror/addon/mode/multiplex_test.js',
  multiplex: 'node_modules/codemirror/addon/mode/multiplex.js',
  overlay: 'node_modules/codemirror/addon/mode/overlay.js',
  simple: 'node_modules/codemirror/addon/mode/simple.js',
  runmode: 'node_modules/codemirror/addon/runmode/runmode.js',
  colorize: 'node_modules/codemirror/addon/runmode/colorize.js',
  runmode_standalone:
    'node_modules/codemirror/addon/runmode/runmode-standalone.js',
  runmode_node: 'node_modules/codemirror/addon/runmode/runmode.node.js',
  annotatescrollbar:
    'node_modules/codemirror/addon/scroll/annotatescrollbar.js',
  scrollpastend: 'node_modules/codemirror/addon/scroll/scrollpastend.js',
  simplescrollbarsCSS:
    'node_modules/codemirror/addon/scroll/simplescrollbars.css',
  simplescrollbars: 'node_modules/codemirror/addon/scroll/simplescrollbars.js',
  jump_to_line: 'node_modules/codemirror/addon/search/jump-to-line.js',
  match_highlighter:
    'node_modules/codemirror/addon/search/match-highlighter.js',
  matchesonscrollbarCSS:
    'node_modules/codemirror/addon/search/matchesonscrollbar.css',
  matchesonscrollbar:
    'node_modules/codemirror/addon/search/matchesonscrollbar.js',
  searchcursor: 'node_modules/codemirror/addon/search/searchcursor.js',
  search: 'node_modules/codemirror/addon/search/search.js',
  active_line: 'node_modules/codemirror/addon/selection/active-line.js',
  mark_selection: 'node_modules/codemirror/addon/selection/mark-selection.js',
  selection_pointer:
    'node_modules/codemirror/addon/selection/selection-pointer.js',
  ternCSS: 'node_modules/codemirror/addon/tern/tern.css',
  tern: 'node_modules/codemirror/addon/tern/tern.js',
  worker: 'node_modules/codemirror/addon/tern/worker.js',
  hardwrap: 'node_modules/codemirror/addon/wrap/hardwrap.js'
}
console.log(Object.keys(modules))
for (key of Object.keys(modules)) {
  buiildPattern[key] = writeCode(modules[key])
}

writeJSON(
  'app/assets/cmAddons.json',
  buiildPattern,
  'Successfully bundled CodeMirror addons'
)

// main JS script
const cmJS = UglifyJS.minify(
  fs.readFileSync(
    'node_modules/codemirror/lib/codemirror.js',
    'utf8',
    (err) => {
      if (err) console.log(`${err}\nMaybe CodeMirror is not installed?`)
    }
  )
).code

// main CSS
const cmCSS = UglifyCSS.processFiles(
  ['node_modules/codemirror/lib/codemirror.css'],
  {
    maxLineLen: 500,
    expandVars: true
  }
)

writeJSON(
  'app/assets/cmScripts.json',
  { js: cmJS, css: cmCSS },
  'Successfully bundled CodeMirror scripts'
)

const themes = glob.sync('node_modules/codemirror/theme/*.css')

const minifyTheme = (path) =>
  UglifyCSS.processFiles([path], {
    maxLineLen: 500,
    expandVars: true,
    debug: true
  })

const bundledThemes = themes.reduce((acc, val) => {
  acc[path.basename(val, '.css')] = minifyTheme(val)
  return acc
}, {})

writeJSON(
  'app/assets/cmThemes.json',
  bundledThemes,
  'Successfully bundled CodeMirror themes'
)

const modes = glob.sync('node_modules/codemirror/mode/*/*.js')

const bundledModes = modes.reduce((acc, val) => {
  acc[path.basename(val, '.js')] = UglifyJS.minify(
    fs.readFileSync(val, 'utf8')
  ).code
  return acc
}, {})

writeJSON(
  'app/assets/cmModes.json',
  bundledModes,
  'Successfully bundled CodeMirror modes'
)
