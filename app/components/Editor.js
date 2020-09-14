import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

import hljs from 'highlight.js'
import * as FileSystem from 'expo-file-system'

import cmScripts from '../assets/cmScripts.json'
import cmThemes from '../assets/cmThemes.json'
import cmModes from '../assets/cmModes.json'
import cmColors from '../assets/cmColors.json'
import cmAddons from '../assets/cmAddons.json'

const extractAddons = (addons) =>
  addons.reduce((acc, val) => acc + ';' + cmAddons[val], '')

export function createHTML(theme, mode, addons) {
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

const saveFile = async (filename, text) => {
  const fileUri = FileSystem.documentDirectory + filename
  await FileSystem.writeAsStringAsync(fileUri, text, {
    encoding: FileSystem.EncodingType.UTF8
  })
}

export default function CodeEditArea({ theme, mode, webviewRef }) {
  const [data, setData] = useState(`console.log("Hello, World");`)
  const addons = ['closetag', 'closebrackets', 'matchbrackets']

  useEffect(() => {
    saveFile('test.js', data)
    console.log('saved')
  }, [data])

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: createHTML(theme, mode, extractAddons(addons)) }}
        style={styles.webView}
        scrollEnabled={false}
        ref={webviewRef}
        onMessage={({ nativeEvent: { data } }) => {
          console.log(data)
          setData(data)
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
