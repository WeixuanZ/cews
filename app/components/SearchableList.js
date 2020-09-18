import React, { useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar, ListItem, Icon, ThemeProvider } from 'react-native-elements'
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
  const [search, setSearch] = useState('')
  return (
    <ThemeProvider useDark={!isLightMode}>
      <SearchBar
        value={search}
        onChangeText={(text) => {
          setSearch(text)
          setData(filterList(text, initialData))
        }}
        platform="ios"
        autoFocus={false}
        autoCorrect={false}
      />
    </ThemeProvider>
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
  const renderItem = ({ item }) => (
    <ThemeProvider useDark={!isLightMode}>
      <TouchableOpacity onPress={() => handleChangeValue(item)}>
        <ListItem
          bottomDivider={true}
        >
          <ListItem.Content style={styles.listItem}>
            <ListItem.Title style={styles.listContent}>{item}</ListItem.Title>
            {item === value && Tick()}
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </ThemeProvider>
  )

  return (
    <View style={styles.container}>
      <SearchHeader {...{ setData, initialData, isLightMode }} />
      <FlatList
        data={currData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={isLightMode}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listContent: {
    flex: 1
  }
})
