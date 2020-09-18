import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { ListItem, ThemeProvider } from 'react-native-elements'

import colors from '../config/colors.js'

const Menu = ({
  theme,
  mode,
  navigation,
  handleChangeTheme,
  handleChangeNavTheme,
  handleChangeNavBool,
  navTheme,
  isLightMode
}) => {
  const toggleSwitch = () => {
    handleChangeNavBool(!isLightMode)
    changeTheme(isLightMode)
  }
  const changeTheme = (state) => {
    if (!state) {
      handleChangeNavTheme(DefaultTheme)
      if (theme === '3024-night') {
        handleChangeTheme('eclipse')
      }
    } else {
      handleChangeNavTheme(DarkTheme)
      if (theme === 'eclipse') {
        handleChangeTheme('3024-night')
      }
    }
  }
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
              style={
                (styles.listContent, { color: getColor('#000000', '#FFFFFF') })
              }
            >
              {subtitle}
            </ListItem.Subtitle>
            <ListItem.Chevron color={colors.primary} />
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </ThemeProvider>
  )

  const SwitchItem = ({ title, subtitle }) => (
    <ThemeProvider useDark={!isLightMode}>
      <ListItem bottomDivider={true}>
        <ListItem.Content style={styles.listItem}>
          <ListItem.Title style={styles.listContent}>{title}</ListItem.Title>
          <ListItem.Subtitle style={styles.listContent}>
            {subtitle}
          </ListItem.Subtitle>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isLightMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
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
      <SwitchItem title="Dark/Light" subtitle={''} />
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
