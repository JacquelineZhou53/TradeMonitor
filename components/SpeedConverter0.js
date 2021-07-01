import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

function mph2fps(mph){
  // convert mph to fps
  return mph*5280/3600
}

// const mph2fps = (mph) => mph*5280/3600

const SpeedConverter0 = (props) => {

  const [mph, setMph] = useState(0);
  const [fps, setFps] = useState(0);



      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       MPH to FPS
    </Text>
      <View style={styles.rowContainer}>
        <Text>mph</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={text => {setMph(text)}}
          value={mph.toString()}
          />
      </View>
      <View style={styles.rowContainer}>
        <Text>fps</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={text => {setFps(text)}}
          value = {fps.toString()}
          />
      </View>
      <View style={styles.rowContainer}>
        <Button color='red' title='MPH to FPS'
            onPress={() => {
                   // const mph2fps = (mph) => mph*5280/3600
                   setFps(mph2fps(parseFloat(mph)))
                }}
        />
        <Button color='green' title='FPS to MPH'
        onPress={() => {
               const f = parseFloat(fps);
               const m = (f*3600)/5280;
               setMph(m)
            }}
        />
      </View>
      <Text> state is mph:{mph} and fps:{fps} </Text>
  </View>
      );
    }
  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput:{
      margin:20,
      fontSize:20
    },
    header: {
      fontSize:40,
      color:'blue'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default SpeedConverter0;
