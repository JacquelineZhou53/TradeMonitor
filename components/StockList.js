import React, { useState, useEffect }  from 'react';
import { SafeAreaView, ScrollView, View, Button,
         FlatList, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const StockList = (props) => {
  const [stock,setStock]           = useState({index: "", time:"", price:0, share:0, actionType:""});
  const [index, setIndex]          = useState("");
  const [time,setTime]             = useState("");
  const [price,setPrice]           = useState(0);
  const [share,setShare]           = useState(0);
  const [actionType,setActionType] = useState("");
  const [stockOp, setStockOp]      = useState([]);

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@stock_list')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setStock(data)
            setIndex(data.index)
            setTime(data.time)
            setPrice(data.price)
            setShare(data.share)
            setActionType(data.actionType)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            setStock({})
            setIndex("")
            setTime("")
            setPrice(0)
            setShare(0)
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
          await AsyncStorage.setItem('@stock_list', jsonValue)
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
      <View style={{border:'thin solid red'}}>
        <Text style={styles.stockItem}>
           <Text> Stock Index: {item.index} </Text>
           <Text> Time of operation: {item.time} </Text>
           <Text> Price: {item.price} </Text>
           <Text> Share: {item.share} </Text>
           <Text> Operation type: {item.actionType} </Text>
        </Text>
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
         Stock Operations are {JSON.stringify(stockOp)}
      </Text>
  </View>);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Stock Holdings List </Text>
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
          placeholder="Enter share number"
          onChangeText={text => {
               setDueDate(text);
             }}
          value = {time}
        />
      </View>
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Enter comment"
          onChangeText={text => {
               setComment(text);
             }}
          value = {comment}
        />
      </View>
      <View>
        <Button
           title={"add"}
           color="blue"
           onPress = {() => {
             const newToDoItems =
               todoItems.concat(
                 {'todo':todo,
                 'dueDate':dueDate,
                 'comment':comment,
                 'date':new Date()
               })
             setToDoItems(newStockItems)
             storeData(newToDoItems)
             setTodo("")
             setDueDate("")
             setComment("")
           }}
           />
      </View>
      <FlatList
        data={todoItems}
        renderItem={renderTodoItem}
        keyExtractor={item => item.date}
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


export default StockList;
