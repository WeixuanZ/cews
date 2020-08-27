import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'
// import hljs from 'highlight.js'
import cmScripts from '../assets/cmScripts.json'
import cmThemes from '../assets/cmThemes.json'
import cmModes from '../assets/cmModes.json'
import { getColor } from './getBackground.js'


function createHTML(theme, mode) {
  // const detectedLang = hljs.highlightAuto(codeStr).language
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<script type="text/javascript">
  ${cmScripts.js}
</script>
<script type="text/javascript" async>
  ${cmModes[mode]}
</script>
<style type="text/css">
  ${cmScripts.css}
</style>
<style type="text/css">
  ${cmThemes[theme]}
</style>
</head>
<body style="background-color:${getColor(theme)}">
  <h3>Theme: ${theme}</h3>
  <h3>Mode: ${mode}</h3>
  <script>
  var myCodeMirror = CodeMirror(document.body, {
    lineNumbers: true,
    tabSize: 2,
    value: 'console.log("Hello, World");',
    theme: '${theme}',
    mode: '${mode}'
  });
  </script>
</body>
</html>
`
}

const CodeEditArea = ({ theme, mode }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ html: createHTML(theme, mode) }}
        style={styles.webView}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    width: '100%',
    height: '100%'
  }
})

export default CodeEditArea
