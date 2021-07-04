import React, { useState, useEffect }  from 'react';
import { SafeAreaView, ScrollView, View, Button,
         FlatList, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import DateTimePicker from '@react-native-community/datetimepicker';

const StockList = (props) => {
  const [index, setIndex]          = useState("");
  const [time,setTime]             = useState("");
  const [price,setPrice]           = useState("");
  const [share,setShare]           = useState("");
  const [actionType,setActionType] = useState("");
  const [stocklist, setStocklist]      = useState([]);

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@stocklist')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setStocklist(data)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            setStocklist([])
            setIndex("")
            setTime("")
            setPrice("")
            setShare("")
            setActionType("")
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
          await AsyncStorage.setItem('@stocklist', jsonValue)
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


  const renderStockItem = ({item}) => {
    return (
      <View style={styles.stocklist}>
           <Text> Stock Index: {item.index} </Text>
           <Text> Time of operation: {item.time} </Text>
           <Text> Price: {item.price} </Text>
           <Text> Share: {item.share} </Text>
           <Text> Operation type: {item.actionType} </Text>
      </View>
    )
  }

  let debug=false
  const debugView =
    (<View>
      <Text style={styles.headerText}>
        DEBUGGING INFO
      </Text>
      <Text>
         Stock Index is ({index})
      </Text>
      <Text>
         Time is ({time})
      </Text>
      <Text>
         Price is ({price})
      </Text>
      <Text>
         Share is ({share})
      </Text>
      <Text>
         ActionType is ({actionType})
      </Text>
      <Text>
         Stock Operations are {JSON.stringify(stocklist)}
      </Text>
  </View>);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Stock Holdings List </Text>
      <View style={{flexDirection:'col'}}>
          <View>
            <TextInput
              style={{height: 20}}
              placeholder="Enter stock index"
              onChangeText={text => {
                   setIndex(text);
                 }}
              value = {index}
            />
          </View>
          <View>
            <TextInput
              style={{height: 20}}
              placeholder="Enter date of operation"
              onChangeText={text => {
                   setTime(text);
                 }}
              value = {time}
            />
          </View>
          <View>
            <TextInput
              style={{height: 20}}
              placeholder="Enter price at operation"
              onChangeText={text => {
                   setPrice(parseFloat(text));
                 }}
              value = {price}
            />
          </View>
          <View>
            <TextInput
              style={{height: 20}}
              placeholder="Enter share at operation"
              onChangeText={text => {
                   setShare(parseInt(text));
                 }}
              value = {share}
            />
          </View>

          <View>
            <Button
               title={"Buy"}
               color="green"
               onPress = {() => {
                 setActionType("Buy")
                 const newStockOp =
                   stocklist.concat(
                     {'index':index,
                     'time':time,
                     'price':price,
                     'share':share,
                     'actionType':"Buy",
                   })
                 setStocklist(newStockOp)
                 storeData(newStockOp)
                 setIndex("")
                 setTime("")
                 setPrice("")
                 setShare("")
                 setActionType("")
               }}
            />
          </View>
          <View>
            <Button
               title={"Sell"}
               color="orange"
               onPress = {() => {
                 setActionType("Sell")
                 const newStockOp =
                   stocklist.concat(
                     {'index':index,
                     'time':time,
                     'price':price,
                     'share':share,
                     'actionType':"Sell",
                   })
                 setStocklist(newStockOp)
                 storeData(newStockOp)
                 setIndex("")
                 setTime("")
                 setPrice("")
                 setShare("")
                 setActionType("")
               }}
            />
          </View>
          <View>
            <Button
                    title={"clear logs"}
                    color="red"
                    onPress = {() => {
                      clearAll()
                      setStocklist([])
                    }}
            />
          </View>
      </View>
      <FlatList
        data={stocklist}
        renderItem={renderStockItem}
        keyExtractor={item => item.time + item.index + String(item.share) + String(item.price)}
      />
      {debug?debugView: <Text>""</Text>}
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
  stocklist:{
    justifyContent:'center',
    flexDirection:'row',
    fontSize: 26,
  },
  headerText: {
    textAlign:'center',
    fontSize:26,
  },

});


export default StockList;
