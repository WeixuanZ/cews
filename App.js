import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'
import SearchableList from './app/components/SearchableList.js'
import { HeaderButtons, Item } from './app/components/HeaderButtons'

import cmModes from './app/assets/cmModes.json'
import cmColors from './app/assets/cmColors.json'
import dispatch from './app/assets/cmCommands'

import { useDarkMode } from 'react-native-dynamic'

const Stack = createStackNavigator()

const App = () => {
  const [theme, setTheme] = !useDarkMode() ? useState('eclipse') : useState('3024-night')
  const [mode, setMode] = useState('javascript')
  const [navTheme, setNavTheme] = !useDarkMode() ? useState(DefaultTheme) : useState(DarkTheme);
  const [isLightMode, setLight] = useState(!useDarkMode());

  const webviewRef = useRef(null)
  const cmDispatch = dispatch(webviewRef)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cmColors.backgroundColor[theme] }
      ]}
    >
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Editor"
            options={({ navigation }) => ({
              title: '',
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <HeaderButtons>
                  <Item
                    title="search"
                    iconName="search"
                    onPress={() => cmDispatch('replace')}
                  />
                  <Item
                    title="tab"
                    iconName="keyboard-tab"
                    onPress={() => {
                      cmDispatch('indentMore')
                    }}
                    onLongPress={() => cmDispatch('indentLess')}
                  />
                  <Item
                    title="undo"
                    iconName="undo"
                    onPress={() => cmDispatch('undo')}
                    onLongPress={() => cmDispatch('redo')}
                  />
                  <Item
                    title="comment"
                    iconName="comment"
                    onPress={() => cmDispatch('comment')}
                  />
                  <Item
                    title="save"
                    iconName="save"
                    onPress={() => cmDispatch('save')}
                  />
                  <Item
                    title="settings"
                    iconName="tune"
                    onPress={() => navigation.navigate('Settings')}
                  />
                </HeaderButtons>
              )
            })}
          >
            {(props) => <CodeEditArea {...{ theme, mode, webviewRef }} />}
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {(props) => (
              <Menu
                theme={theme}
                mode={mode}
                navigation={props.navigation}
                handleChangeTheme={setTheme}
                handleChangeMode={setMode}
                handleChangeNavTheme={setNavTheme}
                handleChangeNavBool={setLight}
                navTheme = {navTheme}
                isLightMode={isLightMode}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Set Editor Theme">
            {(props) => (
              <SearchableList
                data={Object.keys(cmColors.backgroundColor)}
                value={theme}
                handleChangeValue={setTheme}
                isLightMode={isLightMode}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Set Editor Language">
            {(props) => (
              <SearchableList
                data={Object.keys(cmModes)}
                value={mode}
                handleChangeValue={setMode}
                isLightMode={isLightMode}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
