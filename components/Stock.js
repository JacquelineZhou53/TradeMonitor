import React, { useState } from "react";
import {View,StyleSheet,FlatList,Text,Button,TextInput} from 'react-native';

const renderItem = ({item}) => {
  <Text>{item.stock}</Text>
}

const Stock = () => {
  const [data,setData] = useState([{'stock':'eat'},{'stock':'sleep'}])

  return (
    <View style={{margin:'25%',marginTop:10}}>
      <Text style={{fontSize:32, color:'blue'}}>Stock Holdings List </Text>
      <FlatList
        data = {data}
        renderItem = {renderItem}
        keyExtractor={({todo}, index) => index}
        />
      <TextInput
         placeholder="item"
         />
      <Button title="add" color="purple" />
      <Text>
        data = {JSON.stringify(data)}
      </Text>
    </View>
  );
}

export default Stock;
