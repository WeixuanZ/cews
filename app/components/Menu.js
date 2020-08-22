import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-community/picker';


export default class Menu extends React.Component {
	constructor(props) {
		super (props);

		this.state = {
			selectedTheme: 'eclipse'
		}
	}
	render() {
		return (
			<Picker
			  selectedValue={this.state.selectedTheme}
			  style={{height: 50, width: 100}}
			  onValueChange={(itemValue, itemIndex) => {
			    { this.setState({selectedTheme: itemValue}); this.props.getTheme(itemValue); console.log('test') } } 
			  }>
			  
			  <Picker.Item label="Eclipse" value="eclipse" />
			  <Picker.Item label="Dracula" value="dracula" />
			</Picker>
		)
	}
}

