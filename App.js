import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'





const App = () => {
  const [theme, SetTheme] = useState('eclipse');

  const getTheme = (selectedTheme) => {
    SetTheme(theme);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Menu getTheme = {getTheme} />
      <CodeEditArea theme = {theme}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
