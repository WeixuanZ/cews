import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'

import cmColors from './app/assets/cmColors.json'

const App = () => {
  const [theme, setTheme] = useState('eclipse')
  const [mode, setMode] = useState('javascript')

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: cmColors.backgroundColor[theme] }
      ]}
    >
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