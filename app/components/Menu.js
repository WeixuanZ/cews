import React from 'react'
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { ListItem, ThemeProvider } from 'react-native-elements'

import colors from '../config/colors.js'

const Menu = ({
  theme,
  mode,
  navigation,
  isLightMode,
  handleChangeIsLightMode
}) => {
  const getColor = (color1, color2) => {
    return isLightMode ? color1 : color2
  }
  const SettingItem = ({ title, subtitle, target }) => (
    <ThemeProvider useDark={!isLightMode}>
      <TouchableOpacity>
        <ListItem
          onPress={() => navigation.navigate(target)}
          bottomDivider={true}
        >
          <ListItem.Content style={styles.listItem}>
            <ListItem.Title style={styles.listContent}>{title}</ListItem.Title>
            <ListItem.Subtitle
              style={[
                styles.listContent,
                { color: getColor('#000000', '#FFFFFF') }
              ]}
            >
              {subtitle}
            </ListItem.Subtitle>
            <ListItem.Chevron color={colors.primary} />
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </ThemeProvider>
  )

  const SwitchItem = ({ title }) => (
    <ThemeProvider useDark={!isLightMode}>
      <ListItem bottomDivider={true}>
        <ListItem.Content style={styles.listItem}>
          <ListItem.Title style={styles.listContent}>{title}</ListItem.Title>
          <Switch
            trackColor={{ false: '#767577', true: colors.primaryHighlight }}
            thumbColor={isLightMode ? '#fff' : colors.primary}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleChangeIsLightMode}
            value={isLightMode}
          />
        </ListItem.Content>
      </ListItem>
    </ThemeProvider>
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
      <SwitchItem title="Dark/Light" />
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
