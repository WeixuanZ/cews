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
  const SettingItem = ({ title, subtitle, target }) => (
    <TouchableOpacity>
      <ListItem
        onPress={() => navigation.navigate(target)}
        bottomDivider={true}
      >
        <ListItem.Content style={styles.listItem}>
          <ListItem.Title style={styles.listContent}>{title}</ListItem.Title>
          <ListItem.Subtitle style={styles.listContent}>
            {subtitle}
          </ListItem.Subtitle>
          <ListItem.Chevron color={colors.primary} />
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <View>
      <SettingItem
        title="Theme"
        subtitle={theme[0].toUpperCase() + theme.slice(1)}
        target="Set Editor Theme"
      />
      <SettingItem
        title="Language"
        subtitle={mode[0].toUpperCase() + mode.slice(1)}
        target="Set Editor Language"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listContent: {
    flex: 1
  }
})

export default Menu
