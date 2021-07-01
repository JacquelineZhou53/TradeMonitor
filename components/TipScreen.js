import React, { useState } from "react";
import {View,StyleSheet} from 'react-native';
import TipCalculator from './TipCalculator';


const TipScreen = () => {
  return (
    <View style={{margin:'25%',marginTop:10}}>
      <TipCalculator tipRate={0.10} />
      <TipCalculator tipRate={0.15} />
      <TipCalculator tipRate={0.20} />
    </View>
  );
}

export default TipScreen;
