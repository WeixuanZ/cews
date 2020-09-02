import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

import cmThemes from '../assets/cmThemes.json'
import cmModes from '../assets/cmModes.json'
import cmColors from '../assets/cmColors.json'

import SearchableFlatlist from "searchable-flatlist";

const Menu = ({ theme, mode, handleChangeTheme, handleChangeMode }) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={theme}
        onValueChange={handleChangeTheme}
        itemStyle={{ color: cmColors.color[theme] }}
      >
        {Object.keys(cmThemes).map((el) => (
          <Picker.Item
            label={el.charAt(0).toUpperCase() + el.slice(1)}
            value={el}
            key={el}
          />
        ))}
      </Picker>
      <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={mode}
        onValueChange={handleChangeMode}
        itemStyle={{ color: cmColors.color[theme] }}
      >
        {Object.keys(cmModes).map((el) => (
          <Picker.Item
            label={el.charAt(0).toUpperCase() + el.slice(1)}
            value={el}
            key={el}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    top: 15
  },
  picker: {
    flex: 1
  }
})

export default Menu
