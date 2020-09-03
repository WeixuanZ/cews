import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'
import SearchableList from './app/components/SearchableList.js'
import { HeaderButtons, Item } from './app/components/HeaderButtons'

import cmModes from './app/assets/cmModes.json'
import cmColors from './app/assets/cmColors.json'

const Stack = createStackNavigator()

const App = () => {
  const [theme, setTheme] = useState('eclipse')
  const [mode, setMode] = useState('javascript')

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cmColors.backgroundColor[theme] }
      ]}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Editor"
            options={({ navigation }) => ({
              title: '',
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <HeaderButtons>
                  <Item
                    title="undo"
                    iconName="undo"
                    onPress={() => console.log('undo')}
                  />
                  <Item
                    title="redo"
                    iconName="redo"
                    onPress={() => console.log('redo')}
                  />
                  <Item
                    title="save"
                    iconName="save"
                    onPress={() => console.log('save')}
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
            {(props) => <CodeEditArea theme={theme} mode={mode} />}
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {(props) => (
              <Menu
                theme={theme}
                mode={mode}
                navigation={props.navigation}
                handleChangeTheme={setTheme}
                handleChangeMode={setMode}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Set Editor Theme">
            {(props) => (
              <SearchableList
                data={Object.keys(cmColors.backgroundColor)}
                value={theme}
                handleChangeValue={setTheme}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Set Editor Language">
            {(props) => (
              <SearchableList
                data={Object.keys(cmModes)}
                value={mode}
                handleChangeValue={setMode}
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
