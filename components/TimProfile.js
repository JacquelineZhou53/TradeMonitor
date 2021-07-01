/*
  Here is a
*/
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements'


export default function TimProfile({route,navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Tim Hickey's Profile </Text>
      <Text>I am a CS Prof at Brandeis. I grew up in New Mexico and got my BA in Mathematics from Brandeis University in 1977 and my PhD in Mathematics from University of Chicago in 1986. I started teaching at Brandeis in 1984. I am currently the Chair of the CS Department.
      </Text>
      <Icon raised name = "home" type = "fontisto" color = "#57A892" onPress={() => navigation.navigate('Home')} />
      <Image
        style= {{ width: 305, height: 300}}
        source=  {require('../assets/tim.png')}
        alt = "tim"
      />
      <Button title="Go Home"
          onPress={() => navigation.navigate('Home')} />
      <Button title="See Default Profile"
          onPress={() =>
            navigation.navigate('Profile',{name:"Tim Hickey"})} />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'25%',
    marginTop:20,
    padding:20,
  },
  headerText: {
    fontSize: 40,
    color: 'blue'
  },

});
