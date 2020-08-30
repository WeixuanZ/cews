import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
// import hljs from 'highlight.js'
import cmScripts from '../assets/cmScripts.json'
import cmThemes from '../assets/cmThemes.json'
import cmModes from '../assets/cmModes.json'
import cmColors from '../assets/cmColors.json'
import { UNDERSCORE_TITLE_MODE } from 'highlight.js'

function createHTML(theme, mode) {
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

<style>
  .button {
    background-color: ${cmColors.color[theme]};
    border: ${cmColors.backgroundColor[theme]};
    color: ${cmColors.backgroundColor[theme]};
    text-align: center;
  }
  .headers {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
  }
  h3 {
    flex-grow: 1;
    text-transform: uppercase;
    text-align: center;
  }
  summary {
    color: ${cmColors.color[theme]};
  }
</style>

</head>
<body>
  <details>
    <summary> Details + Buttons (temporary)</summary>
    <section class="headers">
      <h3>Theme: ${theme}</h3>
      <h3>Mode: ${mode}</h3>
    </section>
    <buttons>
      <button class="button" onclick="clearEditor()">Clear</button>
      <button class="button" onclick="saveFile()">Save</button>
    </buttons> 
  </details>
</body>
</html>
`
}

saveFile = async (filename, text) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
      let fileUri = FileSystem.documentDirectory + filename;
      await FileSystem.writeAsStringAsync(fileUri, text, { encoding: FileSystem.EncodingType.UTF8 });
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Download", asset, false)
  }
}

const CodeEditArea = ({ theme, mode }) => {
  return (
    <View style={styles.container}>
      <WebView
        useWebKit
        source={{ html: createHTML(theme, mode) }}
        style={styles.webView}
        scrollEnabled={false}
        injectedJavaScript= {`
          var myCodeMirror = CodeMirror(document.body, {
            lineNumbers: true,
            tabSize: 2,
            autocapitalize: false,
            inputStyle: 'contenteditable',
            value: 'console.log("Hello, World");',
            theme: '${theme}',
            mode: '${mode}'
          });
          function clearEditor() {
            myCodeMirror.setValue('');
          }
          function saveFile() {
            let text = myCodeMirror.getValue();
            // alert(text);
            window.ReactNativeWebView.postMessage(text);
          }
        `}
        onMessage = {event => {
          const fn = "example.txt"
          const text = event.nativeEvent.data;
          saveFile(fn, text);
          alert("Saved " + fn + " containing " + text);
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

export default CodeEditArea