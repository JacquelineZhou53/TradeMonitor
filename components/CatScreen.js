import React, { useState } from "react";
import {View,StyleSheet} from 'react-native';
import Cat from './Cat';


const Cafe = () => {
  return (
    <View style={{margin:'25%',marginTop:10}}>
      <Cat name="Allie" />
      <Cat name="Spot" />
    </View>
  );
}

export default Cafe;
