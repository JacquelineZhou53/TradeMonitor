import React, { useState, useEffect }  from 'react';
import { SafeAreaView, ScrollView, View, Button,
         FlatList, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb+srv://JacquelineZhou53:<password>@cluster0.umfnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", function(err, db){
  if(err){
    console.log("Had error connecting");
  }
  db.collection('stockprops', function (err, collection){
      collection.find().toArray(function(err, items){
        if(err){
          console.log("Had error fetching collection");
        }
        console.log(items);
      });
  });
});
*/

const StockInfo = (props) => {
  const [index, setIndex]          = useState("");
  const [indexList, setIndexList]  = useState([]);
  const [stockInfoList, setStockInfoList] = useState([]);

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@indexlist')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setIndexlist(data)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            setIndexlist([])
            setIndex("")
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
          await AsyncStorage.setItem('@indexlist', jsonValue)
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

  const arr = []
  for (var i = 0; i < indexList.length; i++) {
    const cryptoUrl =
      'https://www.alphavantage.co/query?function=RSI&symbol=' +
      indexList[i] +
      `&interval=weekly&time_period=10&series_type=open&apikey=3GNM04I3VG4LFS8O`
    arr.push(axios.get(cryptoUrl))
  }

  Promise.all(arr)
    .then(response =>
      response.map(res =>{
          let lastRefresh = res.data["Meta Data"]["3: Last Refreshed"];
          let stockInfo = {
            symbol: res.data["Meta Data"]["1: Symbol"],
            price: res.data["Technical Analysis: RSI"][lastRefresh]["RSI"]
          };
          const newStockInfo = stockInfo;
          setStockInfoList(newStockInfo)
          storeData(newStockInfo)
        }
      )
    )
    .catch(err => console.log(err))


  const renderStockItem = ({item}) => {
    return (
      <View>
           <Text style={styles.itemText}> Stock Index: {item.symbol} </Text>
           <Text style={styles.itemText}> RSI (price): {item.price} </Text>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={{height: 20}}
          placeholder="Enter stock index"
          onChangeText={text => {
               setIndex(text);
             }}
          value = {index}
        />
        <Button
           title={"Save Index"}
           color="red"
           onPress = {() => {
             const newIndex =
               indexList.concat(
                 {'index':index,
               })
             setIndexList(newIndex)
             storeData(newIndex)
             setIndex("")
           }}
        />
      </View>
      <FlatList
        data={stockInfoList}
        renderItem={renderStockItem}
        keyExtractor={item => item.symbol + String(item.price)}
      />
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

export default StockInfo;
