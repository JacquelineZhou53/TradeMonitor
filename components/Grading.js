import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const MealSharing = (props) => {
  const [cost, setCost] = useState(0)
  const [tip, setTip] = useState(props.tipRate)
  const [guests, setGuests] = useState(0)
  const [costPerPerson, setCostPerPerson] = useState(0)


      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       Meal Sharing Calculaor for tip = {props.tipRate}
    </Text>
    <View style ={{flexDirection: 'row'}}>
      <Text> Cost of Meal </Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setCost(parseFloat(text))}}
        />
    </View>
    <View style ={{flexDirection: 'row'}}>
      <Text> Adjusted Tip Rate </Text>
      <TextInput
            style={styles.textinput}
            placeholder={tip}
            onChangeText={text => {setTip(parseFloat(text))}}
        />
    </View>
    <View style ={{flexDirection: 'row'}}>
      <Text> Number of Guests </Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setGuests(parseFloat(text))}}
        />
    </View>
    <Button
          color='red' title='Calculate cost per meal'
          onPress = {() =>
               setCostPerPerson(cost*(1+(tip/100))/guests)          }
      />
      <Text>Each guest should pay {costPerPerson}</Text>
  </View>
      );
    }
  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput:{
      margin:20,
      fontSize:20,
      backgroundColor: '#aaa',
    },
    header: {
      fontSize:40,
      color:'blue'
    },
  });

export default MealSharing;
