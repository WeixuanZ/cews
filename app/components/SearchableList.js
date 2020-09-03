import React, { useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar, ListItem, Icon } from 'react-native-elements'

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
    size={20.5}
  />
)

export default function SearchableList({ data, value, handleChangeValue }) {
  const initialData = data
  const [currData, setData] = useState(initialData)

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChangeValue(item)}>
      <ListItem title={item} bottomDivider={true}>
        {item === value && Tick()}
      </ListItem>
    </TouchableOpacity>
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
