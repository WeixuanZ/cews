import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import CodeEditArea from './app/components/Editor.js'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CodeEditArea />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
