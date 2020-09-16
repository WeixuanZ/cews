import React, { useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar, ListItem, Icon } from 'react-native-elements'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

import colors from '../config/colors.js'

// import cmColors from '../assets/cmColors.json'

/* eslint-disable indent */
const filterList = (text, initialData) =>
  text === ''
    ? initialData
    : initialData.filter((word) =>
        word.toLowerCase().includes(text.toLowerCase())
      )
/* eslint-enable */

function SearchHeader({ setData, initialData, isLightMode }) {
  const getColor = (color1, color2) => {
    return isLightMode ? color1 : color2
  }
  const [search, setSearch] = useState('')

  return (
    <SearchBar
      value={search}
      onChangeText={(text) => {
        setSearch(text)
        setData(filterList(text, initialData))
      }}
      platform="ios"
      autoFocus={true}
      autoCorrect={false}
      containerStyle={{ backgroundColor: getColor('#FFFFFF', '#000000') }}
    />
  )
}

const Tick = () => (
  <Icon
    alignText="right"
    name="done"
    type="material"
    color={colors.primary}
    size={20.5}
  />
)

export default function SearchableList({
  data,
  value,
  handleChangeValue,
  isLightMode
}) {
  const initialData = data
  const [currData, setData] = useState(initialData)
  const getColor = (color1, color2) => {
    return isLightMode ? color1 : color2
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChangeValue(item)}>
      <ListItem
        title={item}
        bottomDivider={true}
        containerStyle={{ backgroundColor: getColor('#FFFFFF', '#000000') }}
      >
        {item === value && Tick()}
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <SearchHeader {...{ setData, initialData, isLightMode }} />
      <FlatList
        data={currData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={(isLightMode, getColor('#FFFFFF', '#000000'))}
        style={{ backgroundColor: '#000000' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
