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

const injectAddons = (webviewRef) => {
  const addons = [
    'comment',
    'continuecomment',
    'dialog',
    'autorefresh',
    'fullscreen',
    'panel',
    'placeholder',
    'rulers',
    'closebrackets',
    'closetag',
    'continuelist',
    'matchbrackets',
    'matchtags',
    'trailingspace',
    'brace_fold',
    'comment_fold',
    'foldcode',
    'foldgutter',
    'indent_fold',
    'markdown_fold',
    'xml_fold',
    'anyword_hint',
    'css_hint',
    'html_hint',
    'javascript_hint',
    'show_hint',
    'sql_hint',
    'xml_hint',
    'coffeescript_lint',
    'css_lint',
    'html_lint',
    'javascript_lint',
    'json_lint',
    'lint',
    'yaml_lint',
    'merge',
    'loadmode',
    'multiplex_test',
    'multiplex',
    'overlay',
    'simple',
    'colorize',
    'runmode_standalone',
    'runmode',
    'runmode_node',
    'annotatescrollbar',
    'scrollpastend',
    'simplescrollbars',
    'jump_to_line',
    'match_highlighter',
    'matchesonscrollbar',
    'search',
    'searchcursor',
    'active_line',
    'mark_selection',
    'selection_pointer',
    'tern',
    'worker',
    'hardwrap'
  ];
  var output = ``
  for (const addon of addons) {
    output = output + ';' + (cmAddons[addon])
  }
  return output
}

export function createHTML(theme, mode, addons) {
  // const detectedLang = hljs.highlightAuto(codeStr).language
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style type="text/css">
  ${cmScripts.dialogCSS}
  ${cmScripts.fullscreenCSS}
  ${cmScripts.foldgutterCSS}
  ${cmScripts.show_hintCSS}
  ${cmScripts.lintCSS}
  ${cmScripts.mergeCSS}
  ${cmScripts.simplescrollbarsCSS}
  ${cmScripts.matchesonscrollbarCSS}
  ${cmScripts.ternCSS}
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
<style type="text/css">
  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    color:${cmColors.color[theme]};
    background-color:${cmColors.backgroundColor[theme]};
  }
  ${cmScripts.css}
  .CodeMirror {
    font-size: 12pt;
    line-height: 1.6;
    width: 100%;
    height: 100%;
  }
</style>
<style type="text/css">
  ${cmThemes[theme]}
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
    autoCloseTags: true
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

  useEffect(() => {
    saveFile('test.js', data)
    console.log('saved')
  }, [data])

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: createHTML(theme, mode, injectAddons(webviewRef)) }}
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
