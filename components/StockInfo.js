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
  <View>

  </View>
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
