import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'
import SearchableList from './app/components/SearchableList.js'

import cmModes from './app/assets/cmModes.json'
import cmColors from './app/assets/cmColors.json'

import colors from './app/config/colors.js'

import { MaterialHeaderButtons, Item } from './app/components/MyHeaderButtons'


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
              title: 'Editor',
              // eslint-disable-next-line react/display-name
              headerRight: () => (
              <MaterialHeaderButtons>
                <Item title="undo" iconType="material" iconName="undo" onPress={() => console.log('undo')} />
                <Item title="redo" iconType="material" iconName="redo" onPress={() => console.log('redo')} />
                <Item title="save" iconType="material" iconName="save" onPress={() => console.log('save')} />
                <Item title="settings" iconType="material" iconName="tune" onPress={() => navigation.navigate('Settings')} />
              </MaterialHeaderButtons>
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
  },
  headerBtn: {
    margin: 10
  },
  headerBar: {
    flexDirection: 'row',
    height: 40
  },
  icons: {
    flex: 1
  }
})

export default App
