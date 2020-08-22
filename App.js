import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'

var theme = 'eclipse';

const getTheme = (selectedTheme) => {
	theme = selectedTheme;
	console.log(theme)
}



const App = () => {
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
