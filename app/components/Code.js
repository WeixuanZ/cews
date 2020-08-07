import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Platform } from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/styles/hljs'

const CodeEditArea = ({ value }) => {
  const [content, setContent] = useState('console.log("Hello World")')
  return (
    <View style={styles.container}>
      <SyntaxHighlighter
        language="javascript"
        style={monokai}
        customStyle={styles.field}
        fontSize={14}
        highlighter="hljs"
      >
        {content}
      </SyntaxHighlighter>
      <TextInput
        style={[styles.field, styles.text, styles.overlay]}
        onChangeText={(text) => setContent(text)}
        value={content}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace'
  },
  field: {
    padding: 20,
    width: '100%',
    // height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  overlay: {
    opacity: 0
  }
})

export default CodeEditArea
