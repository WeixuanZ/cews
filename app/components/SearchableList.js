import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { SearchBar, ListItem, Icon } from 'react-native-elements'

import colors from '../config/colors.js'

// import cmColors from '../assets/cmColors.json'

const filterList = (text, initialData) =>
  text === ''
    ? initialData
    : initialData.filter((word) =>
        word.toLowerCase().includes(text.toLowerCase())
      )

function SearchHeader({ setData, initialData }) {
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
    />
  )
}

const Tick = () => (
  <Icon
    alignText="right"
    name="done"
    type="material"
    color={colors.primary}
    size={21}
  />
)

export default function SearchableList({ data, value, handleChangeValue }) {
  const initialData = data
  const [currData, setData] = useState(initialData)

  const renderItem = ({ item }) => (
    <ListItem
      title={item}
      onPress={() => handleChangeValue(item)}
      bottomDivider={true}
    >
      {item === value && Tick()}
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <SearchHeader {...{ setData, initialData }} />
      <FlatList
        data={currData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
