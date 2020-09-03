import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'

import colors from '../config/colors.js'

const Menu = ({
  theme,
  mode,
  navigation,
  handleChangeTheme,
  handleChangeMode
}) => {
  const SettingItem = ({ title, subtitle }) => (
    <ListItem onPress={() => navigation.navigate(title)} bottomDivider={true}>
      <ListItem.Content style={styles.listItem}>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
        <ListItem.Chevron color={colors.primary} />
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View>
      <TouchableOpacity>
        <SettingItem
          title="Set Editor Theme"
          subtitle={theme[0].toUpperCase() + theme.slice(1)}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingItem
          title="Set Editor Language"
          subtitle={mode[0].toUpperCase() + mode.slice(1)}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default Menu
