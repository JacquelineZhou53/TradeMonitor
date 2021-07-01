import React, { useState } from "react";
import {View,StyleSheet,FlatList,Text,Button,TextInput} from 'react-native';

const renderItem = ({item}) => {
  <Text>{item.todo}</Text>
}

const ToDo = () => {
  const [data,setData] = useState([{'todo':'eat'},{'todo':'sleep'}])

  return (
    <View style={{margin:'25%',marginTop:10}}>
      <Text style={{fontSize:32, color:'blue'}}>ToDo List </Text>
      <FlatList
        data = {data}
        renderItem = {renderItem}
        keyExtractor={({todo}, index) => index}
        />
      <TextInput
         placeholder="item"
         />
      <Button title="add" color="red" />
      <Text>
        data = {JSON.stringify(data)}
      </Text>
    </View>
  );
}

export default ToDo;
