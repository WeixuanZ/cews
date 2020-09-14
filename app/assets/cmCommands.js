const commands = {
  undo: `cm.undo()`,
  redo: `cm.redo()`,
  clear: `cm.setValue('')`,
  save: `window.ReactNativeWebView.postMessage(cm.getValue())`,
  comment: `cm.toggleComment()`,
  search: `CodeMirror.commands.replace(cm)`
}

const dispatch = (webviewRef) => (cmd) =>
  webviewRef.current.injectJavaScript(
    commands[cmd] ? commands[cmd] : `cm.execCommand("${cmd}")`
  )

export default dispatch
