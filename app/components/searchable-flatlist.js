import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'

import cmColors from '../assets/cmColors.json'


function SearchHeader(currData, setData, initialData, search, setSearch) {
  return (      
    <SearchBar        
      placeholder="Type Here..."        
      lightTheme        
      round        
      onChangeText={text =>{ setSearch(text); filterList(text, setData, initialData) }}
      value = { search }
      autoCorrect={false}             
    />    
  );  
};

function filterList(text, setData, initialData) {
	if(text == '') {
		setData(initialData);
	}
	else {
		setData(initialData.filter(word => word.toLowerCase().includes(text.toLowerCase())))
	}
};

function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    );
  };

function renderTick({item, currTheme, currMode}) {
	if(item == currTheme || item == currMode) {
		return (
		<Icon alignText='right' 
            name='chevron-right'
            type='material'
            color='#00aced' />
		)
	}

	else {
		return;
	}
	
}

function SearchableList (props) {
	const initialData = props.data;
	const [currData, setData] = useState(initialData);
	const [search, setSearch] = useState('')
	return (
		<View style={{ flex: 1 }}>
		  <FlatList          
		    data={currData}          
		    renderItem={({ item }) => ( 
		      <ListItem              
		        title={item}
		        containerStyle={{ borderBottomWidth: 0}} 
		      >
		      </ListItem>

		     )}          
		     ItemSeparatorComponent={renderSeparator} 
		     ListHeaderComponent={SearchHeader(currData, setData, initialData, search, setSearch)}
		     keyExtractor = {(item, index) => {item}}              
		  />            
		</View>
		)
}

export default SearchableList

