import React, { useState } from 'react'
import {
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'

import cmModes from './app/assets/cmModes.json'
import cmColors from './app/assets/cmColors.json'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Icon } from 'react-native-elements'

import SearchableList from './app/components/searchable-flatlist.js'

const Stack = createStackNavigator()

const App = () => {
  const [theme, setTheme] = useState('eclipse')
  const [mode, setMode] = useState('javascript')

  return (
    <SafeAreaView
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
              title: 'Editor',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                >
                  <Icon name="settings" type="material" />
                </TouchableOpacity>
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
                handleChangeTheme={setTheme}
                handleChangeMode={setMode}
                navigation={props.navigation}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Set Editor Theme">
            {(props) => (
              <SearchableList
                data={Object.keys(cmColors.backgroundColor)}
                value={theme}
                changeValue={setTheme}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Set Editor Language">
            {(props) => (
              <SearchableList
                data={Object.keys(cmModes)}
                value={mode}
                changeValue={setMode}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
