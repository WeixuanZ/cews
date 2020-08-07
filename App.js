import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import CodeEditArea from './app/components/Code.js'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CodeEditArea />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
