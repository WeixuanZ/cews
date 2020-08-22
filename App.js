import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'

const App = () => {
  const [theme, setTheme] = useState('eclipse')
  const [mode, setMode] = useState('javascript')

  return (
    <SafeAreaView style={styles.container}>
      <Menu
        theme={theme}
        mode={mode}
        handleChangeTheme={setTheme}
        handleChangeMode={setMode}
      />
      <CodeEditArea theme={theme} mode={mode} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
