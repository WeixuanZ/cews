import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

import hljs from 'highlight.js' // const detectedLang = hljs.highlightAuto(codeStr).language

import RNFetchBlob from 'rn-fetch-blob'

import cmScripts from '../assets/cmScripts.json'
import cmThemes from '../assets/cmThemes.json'
import cmModes from '../assets/cmModes.json'
import cmColors from '../assets/cmColors.json'
import cmAddons from '../assets/cmAddons.json'
import cmAdvancedAddons from '../assets/cmAdvancedAddons.js'

import DialogInput from 'react-native-dialog-input'

const extractAddons = (addons) =>
  addons.reduce((acc, val) => acc + ';' + cmAddons[val], '')

const createHTML = (theme, mode, addons) => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style type="text/css">
  ${cmAdvancedAddons.advanced_dialog_css}
  ${cmAddons.fullscreen_css}
  ${cmAddons.foldgutter_css}
  ${cmAddons.show_hint_css}
  ${cmAddons.lint_css}
  ${cmAddons.merge_css}
  ${cmAddons.simplescrollbars_css}
  ${cmAddons.matchesonscrollbar_css}
  ${cmAddons.tern_css}
</style>
<script type="text/javascript">
  ${cmScripts.js}
</script>
<script type="text/javascript" async>
  ${cmModes[mode]}
</script>
<script type="text/javascript">
  ${addons}
</script>
<script type="text/javascript">
  ${cmAdvancedAddons.advanced_dialog}
  ${cmAdvancedAddons.revised_search}
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
  .cm-trailingspace {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUXCToH00Y1UgAAACFJREFUCNdjPMDBUc/AwNDAAAFMTAwMDA0OP34wQgX/AQBYgwYEx4f9lQAAAABJRU5ErkJggg==);
    background-position: bottom left;
    background-repeat: repeat-x;
  }
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
    matchBrackets: true,
    showTrailingSpace: true,
    searchMode: 'popup'
  });
  </script>
</body>
</html>
`

const saveFile = async (fileUri, text, setFile, changeVisible) => {
  changeVisible(false)
  setFile(fileUri)
  console.log(fileUri)
  RNFetchBlob.fs
    .writeFile(fileUri, text, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN! Path:' + fileUri)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

const getFilename = async (text, currFile, setFile, changeVisible) => {
  if (currFile != '') {
    saveFile(currFile, text, setFile, changeVisible)
  } else {
    changeVisible(true)
  }
}

export default function CodeEditArea({
  theme,
  mode,
  webviewRef,
  data,
  setData,
  currFile,
  setFile
}) {
  const [visible, changeVisible] = useState(false)

  const didMount = useRef(false)
  const addons = [
    'closetag',
    'closebrackets',
    'matchbrackets',
    'trailingspace',
    'comment',
    'jump_to_line',
    'match_highlighter',
    'panel',
    'searchcursor'
  ]

  return (
    <View style={styles.container}>
      <DialogInput
        isDialogVisible={visible}
        title={'Save As'}
        message={
          'What do you want to save the file as? It will save to the Documents folder by default'
        }
        hintInput={'FileName.js'}
        submitInput={(inputText) => {
          saveFile(
            RNFetchBlob.fs.dirs.DocumentDir + inputText,
            data,
            setFile,
            changeVisible
          )
        }}
        closeDialog={() => {
          changeVisible(false)
        }}
      ></DialogInput>
      <WebView
        source={{ html: createHTML(theme, mode, extractAddons(addons)) }}
        style={styles.webView}
        scrollEnabled={false}
        ref={webviewRef}
        onMessage={({ nativeEvent: { data } }) => {
          setData(data)
          getFilename(data, currFile, setFile, changeVisible)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    flex: 1
  }
})
