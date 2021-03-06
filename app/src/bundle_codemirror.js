/* A script to bundle CodeMirror files

   The following json files will be written in the assets folder:
   - cmScripts.json: the CodeMirror core js and css
   - cmModes: js files for highlighting of different languages
      Keys are mode name, e.g. cmModes.javascript
   - cmThemes: css files for themes of the editor
      Keys are theme name, e.g. cmThemes.eclipse
   - cmAddons: js and css files for CodeMirror addons
      Keys are addon category, then addon name (css files have suffix _css appended)
      e.g. cmAddons.lint, cmAddons.lint_css
 */

const fs = require('fs')
const glob = require('glob')
const pathLib = require('path')
const UglifyJS = require('uglify-js')
const UglifyCSS = require('uglifycss')
const replace = require('replace-in-file')

const writeJSON = (path, obj, successMsg) => {
  fs.writeFile(path, JSON.stringify(obj), (err) => {
    err ? console.log(err) : console.log(successMsg)
  })
}

/* eslint-disable indent */
const minify = (path) =>
  pathLib.extname(path) === '.css'
    ? UglifyCSS.processFiles([path], {
        maxLineLen: 500,
        expandVars: true
      })
    : UglifyJS.minify(
        fs.readFileSync(path, 'utf8', (err) => {
          if (err) console.log(`${err}\nError finding file at ${path}`)
        })
      ).code
/* eslint-enable */

writeJSON(
  'app/assets/cmScripts.json',
  {
    js: minify('node_modules/codemirror/lib/codemirror.js'),
    css: minify('node_modules/codemirror/lib/codemirror.css')
  },
  'Successfully bundled CodeMirror scripts'
)

const themes = glob.sync('node_modules/codemirror/theme/*.css')

const bundledThemes = themes.reduce((acc, val) => {
  acc[pathLib.basename(val, '.css')] = minify(val)
  return acc
}, {})

writeJSON(
  'app/assets/cmThemes.json',
  bundledThemes,
  'Successfully bundled CodeMirror themes'
)

const modes = glob.sync('node_modules/codemirror/mode/*/*.js')

const bundledModes = modes.reduce((acc, val) => {
  acc[pathLib.basename(val, '.js')] = minify(val)
  return acc
}, {})

writeJSON(
  'app/assets/cmModes.json',
  bundledModes,
  'Successfully bundled CodeMirror modes'
)

const options = {
  files: 'node_modules/codemirror/addon/display/panel.js',
  from: `var editorheight = newHeight - info.panels
        .map(function (p) { return p.node.getBoundingClientRect().height; })
        .reduce(function (a, b) { return a + b; }, 0);`,
  to: `var editorheight = newHeight + 3.5 * info.panels
        .map(function (p) { return p.node.getBoundingClientRect().height; })
        .reduce(function (a, b) { return a + b; }, 0);`
}

replace(options, (error, results) => {
  if (error) {
    return console.error('Error occurred:', error)
  }
  bundleAddons()
})

const bundleAddons = () => {
  const addons = glob.sync('node_modules/codemirror/addon/*/*')
  const bundledAddons = addons.reduce((acc, val) => {
    acc[
      pathLib
        .basename(val)
        .replace('-', '_')
        .replace(/\.js$/, '')
        .replace(/\.css$/, '_css')
    ] = minify(val)
    return acc
  }, {})
  writeJSON(
    'app/assets/cmAddons.json',
    bundledAddons,
    'Successfully bundled CodeMirror addons'
  )
}
