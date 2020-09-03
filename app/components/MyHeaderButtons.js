import * as React from 'react';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import colors from '../config/colors.js'
 
// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = (props) => (
	<TouchableOpacity>
		<HeaderButton IconComponent={Icon} iconSize={23} color={colors.primary} {...props} />
	</TouchableOpacity>
);
 
export const MaterialHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={MaterialHeaderButton} {...props} />;
};
export { Item } from 'react-navigation-header-buttons';