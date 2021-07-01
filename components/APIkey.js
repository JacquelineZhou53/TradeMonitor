/*
APIkey is an app that lets you store an APIkey that you can use later...
*/
import React, { useState, useEffect }  from 'react';
import { SafeAreaView, ScrollView, View, Button,
         FlatList, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APIkey = (props) => {
  const [text,setText] = useState("")
  const [apikey,setAPIkey] = useState("")


  useEffect(() => {getData()}
           ,[])


  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@apikey')
          console.log(`just read "${jsonValue}" from storage @apikey`)
          let data = null
          if (jsonValue!=null) {

            data = JSON.parse(jsonValue)
            setAPIkey(data)
            console.log('just set APIkey to '+data)
          } else {
            console.log('just read a null value from Storage')
            setAPIkey("")
          }


        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
          // error reading value
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          console.log(`getting ready to store ${jsonValue} in @apikey`)
          await AsyncStorage.setItem('@apikey', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> API Key </Text>
      <View>
        <TextInput
          style={{height: 40}}
          placeholder="Enter API Key here"
          onChangeText={text => {
               setText(text);
             }}
        />
      </View>

      <View>
        <Button
           title={"Store APIkey"}
           color="blue"
           onPress = {() => {
             storeData(text)
           }}
           />
           <Button
              title={"Get APIkey"}
              color="blue"
              onPress = {() => {
                const d = getData()

              }}
              />
      </View>
      <Text>The APIkey is '{apikey}'</Text>
      <Text> and the text is '{text}'</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  todoItem:{
    justifyContent:'center',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'#aaa',
    fontSize: 16,
    padding:10,
    color: 'blue'
  },

});


export default APIkey;
