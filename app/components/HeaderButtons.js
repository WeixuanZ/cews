import * as React from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import {
  HeaderButtons as RNHeaderButtons,
  HeaderButton as RNHeaderButton
} from 'react-navigation-header-buttons'

import colors from '../config/colors.js'

const HeaderButton = (props) => (
  <TouchableOpacity>
    <RNHeaderButton
      IconComponent={Icon}
      iconSize={23}
      color={colors.primary}
      {...props}
    />
  </TouchableOpacity>
)

export const HeaderButtons = (props) => {
  return <RNHeaderButtons HeaderButtonComponent={HeaderButton} {...props} />
}
export { Item } from 'react-navigation-header-buttons'
