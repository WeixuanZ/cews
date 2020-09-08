export const execCommand = (cmd) => `cm.execCommand("${cmd}")`

export const undo = `cm.undo()`
export const redo = `cm.redo()`
export const clear = `cm.setValue('')`
export const save = `window.ReactNativeWebView.postMessage(cm.getValue())`
