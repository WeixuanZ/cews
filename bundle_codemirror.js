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

const cmCloseTag = UglifyJS.minify(
  fs.readFileSync(
    'node_modules/codemirror/addon/edit/closetag.js',
    'utf8',
    (err) => {
      if (err) console.log(`${err}\nMaybe closetag.js is not installed?`)
    }
  )
).code

const cmFold = UglifyJS.minify(
  fs.readFileSync(
    'node_modules/codemirror/addon/fold/xml-fold.js',
    'utf8',
    (err) => {
      if (err) console.log(`${err}\nMaybe xml-fold.js is not installed?`)
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
  { js: cmJS, css: cmCSS, fold: cmFold, closeTag: cmCloseTag },
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
