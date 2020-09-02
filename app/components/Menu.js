import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-community/picker'

import cmThemes from '../assets/cmThemes.json'
import cmModes from '../assets/cmModes.json'
import cmColors from '../assets/cmColors.json'

import SearchableList from "./searchable-flatlist.js";

import { ListItem, Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native'


const Menu = ({ theme, mode, handleChangeTheme, handleChangeMode, navigation }) => {
  return (
  <View>
    <TouchableOpacity>
      <ListItem onPress={() => navigation.navigate('Set Editor Theme')}>
        <ListItem.Content style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ListItem.Title style={{flex: 3}}>
            {"Editor Theme"}
          </ListItem.Title>
          <ListItem.Subtitle style={{flex: 2.8}}>
            {theme.toUpperCase().substr(0,1) + theme.substr(1)}
          </ListItem.Subtitle>
          <Icon alignText='right' 
            name='chevron-right'
            type='material'
            color='#00aced' />
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
    <View
        style={{
          height: 0.6,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    <TouchableOpacity>
      <ListItem onPress={() => navigation.navigate('Set Editor Language')}>
        <ListItem.Content style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ListItem.Title style={{flex: 3}}>
            {"Editor Language"}
          </ListItem.Title>
          <ListItem.Subtitle style={{flex: 2.8}}>
            {mode.toUpperCase().substr(0,1) + mode.substr(1)}
          </ListItem.Subtitle>
          <Icon alignText='right' 
            name='chevron-right'
            type='material'
            color='#00aced' />
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
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
