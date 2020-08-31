import React, { useState } from 'react'
import { Button, StyleSheet, SafeAreaView } from 'react-native'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'

import cmColors from './app/assets/cmColors.json'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

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
          <Stack.Screen name="Editor"  options={({ navigation }) => ({
              title: 'Editor',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Settings')}
                  title="settings"
                  type="material"
                />
              ),
            })}
          >
            {(props) => <CodeEditArea theme={theme} mode={mode} />}
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {(props) => <Menu theme={theme} mode={mode} handleChangeTheme={setTheme} handleChangeMode={setMode} />}
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
