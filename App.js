import React from 'react';
import {Button, Text, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StockInfo from './components/StockInfo'
import StockList from './components/StockList'

/*
  Demo App for CS153 Sum21
  Instructor: Tim Hickey
  Teaching Assistant: Belle Scott
*/

//navigator
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
            options={{ title: 'Trading Monitor' }}/>
        <Stack.Screen name="StockList" component={StockList}/>
        <Stack.Screen name="StockInfo" component={StockInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="See Operation List"
        color="blue"
        onPress={() =>
          navigation.navigate('StockList')
        }
      />
      <Button
        title="Go to Stock Information Page"
        color="purple"
        onPress={() =>
          navigation.navigate('StockInfo')
        }
      />
    </View>
  );
};

export default MyStack;
