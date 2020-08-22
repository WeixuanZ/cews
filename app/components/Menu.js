import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
			<View style = {styles.container}>
				<View style = {{flexDirection: "row", AlignItems: 'center'}}>
					
					<Picker
					  selectedValue={this.state.selectedTheme}
					  style={{flex:0.5, top:10, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]}}
					  onValueChange={(itemValue, itemIndex) => {
					    { this.setState({selectedTheme: itemValue}); this.props.getTheme(itemValue) } } 
					  }>
					  
					  <Picker.Item label="Eclipse" value="eclipse" />
					  <Picker.Item label="Dracula" value="dracula" />
					</Picker>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 0.06
  }
})

