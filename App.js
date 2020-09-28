import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useDarkMode } from 'react-native-dynamic'
import { StatusBar } from 'expo-status-bar'

import RNFetchBlob from 'rn-fetch-blob'

import CodeEditArea from './app/components/Editor.js'
import Menu from './app/components/Menu.js'
import SearchableList from './app/components/SearchableList.js'
import { HeaderButtons, Item } from './app/components/HeaderButtons'

import cmModes from './app/assets/cmModes.json'
import cmColors from './app/assets/cmColors.json'
import dispatch from './app/assets/cmCommands'

import DocumentPicker from 'react-native-document-picker'

const Stack = createStackNavigator()

const loadData = async (filename, setData, webviewRef, setFile) => {
  try {
    const file = await DocumentPicker.pick({})
    RNFetchBlob.fs
      .stat(file.uri)
      .then((stats) => {
        const truePath = stats.path
        RNFetchBlob.fs
          .readFile(truePath, 'utf8')
          .then((res) => {
            console.log(truePath)
            setData(res)
            setFile(truePath)
            const code = res.split('\n').join('\\n')
            webviewRef.current.injectJavaScript(`cm.setValue('${code}')`)
          })
          .catch((err) => {
            console.log(err.message, err.code)
          })
      })
      .catch((err) => {})
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err
    }
  }
}

const App = () => {
  const [theme, setTheme] = !useDarkMode()
    ? useState('eclipse')
    : useState('3024-night')
  const [mode, setMode] = useState('javascript')
  const [isLightMode, setIsLightMode] = useState(!useDarkMode())
  const [data, setData] = useState(`console.log("Hello, World");`)
  const [currFile, setFile] = useState('')

  const webviewRef = useRef(null)
  const cmDispatch = dispatch(webviewRef, data)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cmColors.backgroundColor[theme] }
      ]}
    >
      <StatusBar style={isLightMode ? 'dark' : 'light'} />
      <NavigationContainer theme={isLightMode ? DefaultTheme : DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Editor"
            options={({ navigation }) => ({
              title: '',
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <HeaderButtons>
                  <Item
                    title="openFile"
                    iconName="create-new-folder"
                    onPress={() =>
                      loadData('test.js', setData, webviewRef, setFile)
                    }
                  />
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
            {(props) => (
              <CodeEditArea
                {...{
                  theme,
                  mode,
                  webviewRef,
                  data,
                  setData,
                  currFile,
                  setFile
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {(props) => (
              <Menu
                theme={theme}
                mode={mode}
                navigation={props.navigation}
                isLightMode={isLightMode}
                handleChangeIsLightMode={() =>
                  setIsLightMode((isLightMode) => !isLightMode)
                }
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
