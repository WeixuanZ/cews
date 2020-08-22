import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

const Menu = ({ theme, mode, handleChangeTheme, handleChangeMode }) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={theme}
        onValueChange={handleChangeTheme}
      >
        <Picker.Item label="Eclipse" value="eclipse" />
        <Picker.Item label="Dracula" value="dracula" />
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  picker: {
    flex: 1
  }
})

export default Menu
